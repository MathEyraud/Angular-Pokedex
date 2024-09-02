import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, forkJoin, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { PokemonMove, PokemonMoveVersion } from 'src/app/models/pokemon/pokemon/pokemon-move';
import { Pokemon } from 'src/app/models/pokemon/pokemon/pokemon';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon/pokemon.service';
import { environment } from 'src/environments/environment';
import { Moves } from 'src/app/models/moves/moves/moves';
import { PokemonSpeciesService } from 'src/app/services/pokemon/pokemon-species/pokemon-species.service';
import { PokemonSpecies } from 'src/app/models/pokemon/pokemon-species/pokemon-species';
import { GrowthRatesService } from 'src/app/services/pokemon/growth-rates/growth-rates.service';
import { GrowthRate } from 'src/app/models/pokemon/growth-rates/growth-rate.model';

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
  private apiUrl          = environment.apis.dataPokemon.url;  // URL de l'API Pokémon
  private destroy$        = new Subject<void>();
  moveDetailsByMoveMap    = new Map<PokemonMove, Moves>();

  pokemon             : Pokemon | null  = null;         // Objet Pokémon contenant les détails de bases
  alternativeForms    !: Pokemon[];                     // Objet avec les formes alternatives
  pokemonSpecies      !: PokemonSpecies;                // Objet Pokémon contenant les détails plus avancés
  growthRate          !: GrowthRate;                    // Autre détails du pokemon 

  gameVersions        : string[] = [];                  // Liste des versions de jeu disponibles
  selectedVersion     : string = '';                    // Version de jeu actuellement sélectionnée
  isFirstGeneration   : boolean = true;                 // Gérer la 1er génération pour le passage de la page d'acceuil à la version sidebar
  isLoading           : boolean = false;                // Indicateur de chargement en cours

  levelUpMovesMethod  : PokemonMove[] = [];             // Tableau pour stocker les attaques que peut apprendre le pokemon par montée de lvl
  machineMovesMethod  : PokemonMove[] = [];             // Tableau pour stocker les attaques que peut apprendre le pokemon par CT/CS
  tutorMovesMethod    : PokemonMove[] = [];             // Tableau pour stocker les attaques que peut apprendre le pokemon par un pnj
  eggMovesMethod      : PokemonMove[] = [];             // Tableau pour stocker les attaques que peut apprendre le pokemon par un pnj
  
  @Input() pokemonId !: number;                         // ID du Pokémon actuel
  @Output() selectPokemon = new EventEmitter<number>();



  /**
   * CONSTRUCTEUR
   * @param route 
   */
  constructor(
    private route                   : ActivatedRoute,         // Pour accéder aux paramètres de l'URL
    private router                  : Router,                 // Pour la navigation
    private pokemonService          : PokemonService,         // Service pour récupérer les données de base du Pokémon
    private pokemonSpeciesService   : PokemonSpeciesService,  // Service pour récupérer les données plus avancé du Pokémon
    private loggerService           : LoggerService,          // Service de logging
    private growthRatesService      : GrowthRatesService,      // Service pour avoir des détails supplémentaires sur le pokemon
  ) { }





  /**
   * HOOKS
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonId'] && changes['pokemonId'].currentValue && !this.isFirstGeneration) {
      this.initializeComponent();
    }
  }

  ngOnInit(): void {
    this.initializeComponent();
    this.isFirstGeneration = false;
  }

  // Méthode de nettoyage lors de la destruction du composant
  ngOnDestroy(): void {
    // Nettoyage des subscriptions pour éviter les fuites de mémoire
    this.destroy$.next();
    this.destroy$.complete();
  }





  private initializeComponent(): void {

    // Activer l'indicateur de chargement
    this.isLoading = true; 

    // Récupération des détails du Pokémon
    // Puis exécutez diverses méthodes
    this.getPokemonDetail().pipe(

      // Initialise les versions de jeu une fois les détails récupérés
      tap(() => this.initializeGameVersions()), 

      // Initialise les attaques une fois les versions chargé
      tap(() => this.loadMovesForSelectedVersion()), 

      // Arrêtez le chargement une fois les méthodes terminées
      finalize(() => this.isLoading = false), 

      // Gestion des erreurs
      catchError(error => this.handleInitializationError(error)),
      
    ).subscribe();
  }

  handleInitializationError(error: any): Observable<null> {
    this.loggerService.error('Error in initialization sequence:', error);
    this.isLoading = false
    return of(null);
  }

  // Récupère les détails du Pokémon en utilisant l'ID
  getPokemonDetail(): Observable<PokemonSpecies | null> {
    
    // Début de la chaîne d'observables pour récupérer les détails du Pokémon
    return this.pokemonService.getPokemonDetail(this.apiUrl + this.pokemonId).pipe(
  
      // Utilisation de switchMap pour effectuer une nouvelle requête après avoir obtenu les détails de base du Pokémon
      switchMap(data => 
        
        // Convertit les données brutes en une instance de la classe `Pokemon`
        this.pokemonService.createPokemonFromDetail(data).pipe(

          tap(pokemon => {

            // Assigne le Pokémon à l'attribut de classe
            this.pokemon = pokemon; 
    
            // Vérifie que le Pokémon et son espèce sont valides avant de continuer
            if (!pokemon?.species?.url) {
              throw new Error('Invalid Pokémon species URL');
            }
          })
        )
      ),
  
      // Après avoir récupéré les détails du Pokémon, récupère les informations sur l'espèce associée
      switchMap(pokemon => this.pokemonSpeciesService.getPokemonSpecies(pokemon.species.url)),
      tap(pokemonSpecies => {

        // Assigne les données de l'espèce de Pokémon à l'attribut de classe `pokemonSpecies`
        this.pokemonSpecies = pokemonSpecies;

        // Récupérer le taux de croissance après avoir obtenu les données de l'espèces
        this.fetchGrowthRate(this.pokemonSpecies.growthRateRessource.url);

      }),

      // Traitement des formes alternatives du Pokémon
      switchMap(pokemonSpecies => {

        // Filtrez pour exclure la forme de base en utilisant le nom du Pokémon
        const alternativeFormRequests = pokemonSpecies.varieties

          // Filtre les formes alternatives pour exclure la forme de base en utilisant le nom du Pokémon
          .filter(variety => variety.pokemon.name !== this.pokemon!.name)

          // Pour chaque forme alternative, effectue une requête pour récupérer ses détails
          .map(variety => this.pokemonService.getPokemonDetail(variety.pokemon.url).pipe(
            // Convertit les données brutes en une instance de la classe `Pokemon`
            switchMap(data => this.pokemonService.createPokemonFromDetail(data))
          ));
        
        if (alternativeFormRequests.length === 0) {
          // Définit `alternativeForms` comme un tableau vide si aucune forme alternative n'est trouvée
          this.alternativeForms = [];
          return of(pokemonSpecies);
          
        } else {
          // Utilisation de `forkJoin` pour exécuter toutes les requêtes de formes alternatives en parallèle
          return forkJoin(alternativeFormRequests).pipe(
            
            // Assigne les formes alternatives récupérées à l'attribut de classe `alternativeForms`
            tap(alternativeForms => this.alternativeForms = alternativeForms),
            
            // Retourne l'espèce de Pokémon après le traitement des formes alternatives
            map(() => pokemonSpecies)
          );
        }
      }),
  
      // Gestion des erreurs
      catchError(error => {
        this.loggerService.error('Error fetching Pokémon details or species:', error);
        return of(null);  // Retourner un observable null pour gérer l’erreur en douceur
      })
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
  loadMovesForSelectedVersion(): void {

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
            this.moveDetailsByMoveMap.set(updatedMove, moveDetails);
          }
        });

        // Mettre à jour le Map avec l'attaque mise à jour
        moveMap.set(move.move.name, updatedMove);
      }
    }
  }

  fetchGrowthRate(url: string): void {

    this.growthRatesService.getGrowthRate(url).subscribe({

      // Store the growth rate data
      next: (growthRate) => {this.growthRate = growthRate},

      error: (error) => {this.loggerService.error('Error fetching growth rate data:', error)}
    });
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

  onSelectPokemon(id: number): void {
    this.selectPokemon.emit(id);
  }
}