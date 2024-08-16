import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, map, Observable, of, Subject, Subscription, switchMap, takeUntil, tap } from 'rxjs';
import { PokemonMove, PokemonMoveVersion } from 'src/app/models/pokemon/pokemon/pokemon-move';
import { Pokemon } from 'src/app/models/pokemon/pokemon/pokemon';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon/pokemon.service';
import { environment } from 'src/environments/environment';
import { Moves } from 'src/app/models/moves/moves/moves';
import { EvolutionChain } from 'src/app/models/evolution/evolution-chain';
import { EvolutionChainsService } from 'src/app/services/evolution/evolution-chains.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit, OnChanges, OnDestroy {

  /**
   * ATTRIBUT
   */
  // Déclaration des propriétés du composant
  private destroy$  = new Subject<void>();
  moveDetailsMap    = new Map<PokemonMove, Moves>();

  pokemon             !: Pokemon;             // Objet Pokémon contenant les détails
  evolutionChain      !: EvolutionChain;      // Chaine d'évolution du pokemon
  gameVersions        : string[] = [];        // Liste des versions de jeu disponibles
  selectedVersion     : string = '';          // Version de jeu actuellement sélectionnée
  isFirstGenerate     : number = 0;           // Gérer la 1er génération pour le passage de la page d'acceuil à la version sidebar
  isLoading           : boolean = false;      // Indicateur de chargement en cours

  levelUpMovesMethod  : PokemonMove[] = [];   // Tableau pour stocker les attaques que peut apprendre le pokemon par montée de lvl
  machineMovesMethod  : PokemonMove[] = [];   // Tableau pour stocker les attaques que peut apprendre le pokemon par CT/CS
  tutorMovesMethod    : PokemonMove[] = [];   // Tableau pour stocker les attaques que peut apprendre le pokemon par un pnj
  eggMovesMethod      : PokemonMove[] = [];   // Tableau pour stocker les attaques que peut apprendre le pokemon par un pnj
  
  @Input()
  pokemonId           !: number;              // ID du Pokémon actuel



  /**
   * CONSTRUCTEUR
   * @param route 
   */
  constructor(
    private route           : ActivatedRoute,         // Pour accéder aux paramètres de l'URL
    private router          : Router,                 // Pour la navigation
    private pokemonService  : PokemonService,         // Service pour récupérer les données Pokémon
    private evolutionService: EvolutionChainsService, // Service pour récupérer les données Pokémon
    private loggerService   : LoggerService,          // Service de logging
  ) { }





  /**
   * HOOKS
   */
  ngOnInit(): void {
    this.initializeComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonId'] && changes['pokemonId'].currentValue) {
      this.initializeComponent();
    }
  }

  // Méthode de nettoyage lors de la destruction du composant
  ngOnDestroy(): void {
    // Nettoyage des subscriptions pour éviter les fuites de mémoire
    this.destroy$.next();
    this.destroy$.complete();
  }





  /**
   * METHODES
  */
  private initializeComponent(): void {

    // Activer l'indicateur de chargement
    this.isLoading = true; 

    // Initialisation du composant
    this.getPokemonId().pipe(

      // Assigne l'ID à la propriété pokemonId
      tap(id => this.pokemonId = id), 

      // Utilise l'ID obtenu pour récupérer les détails du Pokémon
      switchMap(() => this.getPokemonDetail()), 

      // Initialise les versions de jeu une fois les détails récupérés
      tap(() => this.initializeGameVersions()), 

      // Initialise les attaques une fois les versions chargé
      tap(() => this.getMovesForSelectedVersion()), 

      // Récupération de la chaîne d'évolution après avoir obtenu les détails du Pokémon
      switchMap(() => this.evolutionService.getEvolutionChains(this.pokemon.species.url)),
      tap(evolutionChain => { 
        this.evolutionChain = evolutionChain; 
        this.isLoading = false;
      }),

      // Gestion des erreurs
      catchError(error => {
        console.error('Error in initialization sequence:', error);
        this.isLoading = false; 
        return of(null);
      }),
      
      // désabonnements automatiquement
      takeUntil(this.destroy$),

    ).subscribe();
  }

  // Récupère l'ID du Pokémon à partir de l'URL
  getPokemonId(): Observable<number> {

    return this.route.paramMap.pipe(

      map(params => {

        let id;

        // Récupération via la page d'acceuil classique
        if (params.get('id') != null && this.isFirstGenerate === 0) {
          id = params.get('id');
          this.isFirstGenerate = 1;
        
        // Récupération via la sidebar
        } else {
          id = this.pokemonId;
        }

        if (id === null) {
          this.router.navigate(['**']);
          throw new Error('ID is null');
        }
        
        return +id;
      }),

      takeUntil(this.destroy$)
    );
  }

  // Récupère les détails du Pokémon en utilisant l'ID
  getPokemonDetail(): Observable<Pokemon> {

    return this.pokemonService.getPokemonDetail(environment.apis.dataPokemon.url + this.pokemonId).pipe(
      
      switchMap(data => this.pokemonService.createPokemonFromDetail(data)),
      tap(pokemon => {this.pokemon = pokemon;})
    );
  }

  // Initialise la liste des versions de jeu disponibles
  initializeGameVersions(): void {

    if (this.pokemon && this.pokemon.moves) {

      const versions = new Set<string>();

      this.pokemon.moves.forEach(move => { 
        move.versions.forEach(detail => {
          versions.add(detail.version_group.name);
        });
      });

      // désabonnements automatiquement
      this.gameVersions = Array.from(versions);
      
      // Sélectionne la première version par défaut
      if (this.gameVersions.length > 0) {
        this.selectedVersion = this.gameVersions[0];
      }
    }
  }

  // Filtre les moves pour la version de jeu sélectionnée
  getMovesForSelectedVersion(): void {

    // Vérifie si les informations du Pokémon et ses mouvements sont disponibles
    if (!this.pokemon || !this.pokemon.moves) return;

    // Créer un Map pour stocker les attaques par leur nom. Cela permet d'éviter les doublons.
    const moveMapLevelUp    = new Map<string, PokemonMove>();
    const moveMapMachine    = new Map<string, PokemonMove>();
    const moveMapEgg        = new Map<string, PokemonMove>();
    const moveMapTutor      = new Map<string, PokemonMove>();
    
    // Filtrage et traitement des attaques par méthode
    this.pokemon.moves.forEach(move => {

      // Récupération des attaques par "level-up"
      this.processMoveByMethod(move, 'level-up', moveMapLevelUp);

      // Récupération des attaques par "machine"
      this.processMoveByMethod(move, 'machine', moveMapMachine);

      // Récupération des attaques par "egg"
      this.processMoveByMethod(move, 'egg', moveMapEgg);

      // Récupération des attaques par "tutor"
      this.processMoveByMethod(move, 'tutor', moveMapTutor);
    });

    // Conversion des Maps en listes triées par niveau ou autres critères
    this.levelUpMovesMethod = this.convertMapToSortedList(moveMapLevelUp);
    this.machineMovesMethod = Array.from(moveMapMachine.values());
    this.eggMovesMethod     = Array.from(moveMapEgg.values());
    this.tutorMovesMethod   = Array.from(moveMapTutor.values());
  }

  // Méthode pour traiter les mouvements en fonction de la méthode d'apprentissage
  processMoveByMethod(move: PokemonMove, method: string, moveMap: Map<string, PokemonMove>): void {

    // Filtrer les détails des versions de l'attaque pour la version de jeu sélectionnée et la méthode choisit
    const versionDetails = move.versions.filter(v => 
      v.version_group.name === this.selectedVersion && v.move_learn_method.name === method
    );

    // Si des détails de version sont trouvés
    if (versionDetails.length > 0) {

      // Trouver le niveau le plus élevé auquel l'attaque est apprise
      const highestLevelDetail = versionDetails.reduce((prev, current) => 
        (prev.level_learned_at > current.level_learned_at) ? prev : current
      );

      // Vérifier si l'attaque existe déjà dans le Map
      const existingMove = moveMap.get(move.move.name);

      // Si l'attaque n'existe pas ou si le niveau trouvé est plus élevé que celui stocké
      if (!existingMove || highestLevelDetail.level_learned_at > (existingMove.versions[0].level_learned_at || 0)) {
          
        // Créer une nouvelle instance de PokemonMove avec le niveau le plus élevé
        const updatedMove = new PokemonMove(
          move.move,
          [highestLevelDetail]
        );

        // Requête pour récupérer les détails du mouvement
        this.pokemonService.getMoveDetails(move.move.url).subscribe(moveDetails => {
          if (moveDetails) {
            this.moveDetailsMap.set(updatedMove, moveDetails);
          }
        });

        // Mettre à jour le Map avec l'attaque mise à jour
        moveMap.set(move.move.name, updatedMove);
      }
    }
  }

  // Méthode pour convertir une Map en une liste triée par niveau
  convertMapToSortedList(moveMap: Map<string, PokemonMove>): PokemonMove[] {
    return Array.from(moveMap.values())
      .sort((a, b) => {
        const levelA = a.versions[0].level_learned_at || 0;
        const levelB = b.versions[0].level_learned_at || 0;
        return levelA - levelB;
      });
  }

  // Filtrer les versions d'une attaques
  getFilteredVersions(move : PokemonMove): PokemonMoveVersion[] {
    return move.versions.filter(version => version.version_group.name === this.selectedVersion);
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  objectValue(obj: any): string[] {
    return Object.values(obj);
  }

}