import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, map, Observable, of, Subject, Subscription, switchMap, takeUntil, tap } from 'rxjs';
import { MovePokemon } from 'src/app/models/move-pokemon';
import { Pokemon } from 'src/app/models/pokemon';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  /**
   * ATTRIBUT
   */
  // Déclaration des propriétés du composant
  private destroy$ = new Subject<void>();
  pokemon           !: Pokemon;             // Objet Pokémon contenant les détails
  gameVersions      : string[] = [];        // Liste des versions de jeu disponibles
  selectedVersion   : string = '';          // Version de jeu actuellement sélectionnée
  isFirstGenerate   : number = 0;           // Gérer la 1er génération pour le passage de la page d'acceuil à la version sidebar

  @Input()
  pokemonId         !: number;              // ID du Pokémon actuel



  /**
   * CONSTRUCTEUR
   * @param route 
   */
  constructor(
    private route           : ActivatedRoute, // Pour accéder aux paramètres de l'URL
    private router          : Router,         // Pour la navigation
    private pokemonService  : PokemonService, // Service pour récupérer les données Pokémon
    private loggerService   : LoggerService,  // Service de logging
  ) { }





  /**
   * HOOKS
   */
  ngOnInit(): void {

    this.loggerService.log("[PokemonDetailsComponent - ngOnInit] ")

    // Initialisation du composant
    this.getPokemonId().pipe(

      // Assigne l'ID à la propriété pokemonId
      tap(id => this.pokemonId = id), 

      // Utilise l'ID obtenu pour récupérer les détails du Pokémon
      switchMap(() => this.getPokemonDetail()), 

      // Initialise les versions de jeu une fois les détails récupérés
      tap(() => this.initializeGameVersions()), 

      catchError(error => {
        console.error('Error in initialization sequence:', error);
        return of(null);
      }),

      // désabonnements automatiquement
      takeUntil(this.destroy$),

    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['pokemonId'] && changes['pokemonId'].currentValue) {
      
      // Initialisation du composant
      this.getPokemonId().pipe(

        // Assigne l'ID à la propriété pokemonId
        tap(id => this.pokemonId = id), 

        // Utilise l'ID obtenu pour récupérer les détails du Pokémon
        switchMap(() => this.getPokemonDetail()), 

        // Initialise les versions de jeu une fois les détails récupérés
        tap(() => this.initializeGameVersions()), 

        catchError(error => {
          console.error('Error in initialization sequence:', error);
          return of(null);
        }),

        // désabonnements automatiquement
        takeUntil(this.destroy$),

      ).subscribe();
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
  // Récupère l'ID du Pokémon à partir de l'URL
  getPokemonId(): Observable<number> {

    return this.route.paramMap.pipe(

      map(params => {

        let id;

        // Récupération via la page d'acceuil classique
        if (params.get('id') != null && this.isFirstGenerate === 0) {
          this.loggerService.log("[PokemonDetailsComponent - getPokemonId] params.get('id') != null : ", params.get('id'))
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
        move.version_group_details.forEach(detail => {
          versions.add(detail.version_group);
        });
      });

      // désabonnements automatiquement
      this.gameVersions = Array.from(versions);
      
      if (this.gameVersions.length > 0) {
        // Sélectionne la première version par défaut
        this.selectedVersion = this.gameVersions[0];
      }
    }
  }

  // Gère le changement de version sélectionnée
  onVersionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedVersion = selectElement.value;
  }

  // Filtre les moves pour la version de jeu sélectionnée
  getMovesForSelectedVersion(): MovePokemon[] {

    if (!this.pokemon || !this.pokemon.moves) return [];

    return this.pokemon.moves.filter(move =>
      move.version_group_details.some(detail => detail.version_group === this.selectedVersion)
    );
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  objectValue(obj: any): string[] {
    return Object.values(obj);
  }

}