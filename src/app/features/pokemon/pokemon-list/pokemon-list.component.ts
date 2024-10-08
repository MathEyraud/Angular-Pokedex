import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon/pokemon/pokemon';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { PokemonPaginationService } from 'src/app/services/pokemon/pokemon/pokemon-pagination.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy{

  /**
    * ATTRIBUT
  */
  // Propriétés partagées
  pokemons                  : Pokemon[] = [];       // Tableau pour stocker les Pokémon chargés
  totalPokemons             : number = 0;           // Nombre total de Pokémon disponibles dans l'API
  subscriptions             : Subscription[] = [];  // Tableau pour stocker les souscriptions afin de les désinscrire plus tard
  currentOffset             : number = 0;           // Offset actuel pour le chargement des Pokémon (utilisé pour la pagination côté serveur)
  itemsPerLoad              : number = 25;          // Nombre de Pokémon à charger à chaque requête
  isLoading                 : boolean = false;      // Indicateur de chargement en cours
  selectedPokemonId         : number = 0;           // ID du Pokémon actuellement sélectionné
  scrollThreshold           : number = 100;         // Seuil de déclenchement du chargement (en pixels avant le bas de la page)


  // Setter pour searchValue (inchangé)
  @Input()
  set searchValue(searchValue : string){
    this.loggerService.log('[PokemonListComponent - Input searchValue]',searchValue)
    // TODO : A GERER
  }

  @Input() 
  styleList : string = '';  // Permet de passer la classe personnalisée




  /**
   * CONSTRUTEUR
  */
  constructor(
    protected loggerService             : LoggerService, 
    protected pokemonService            : PokemonService,
    protected route                     : ActivatedRoute,           // Pour accéder aux paramètres de l'URL
    protected pokemonPaginationService  : PokemonPaginationService, // Service de gestion de la pagination
    protected router                    : Router,
  ) {}





  /**
   * HOOKS
  */
  async ngOnInit() {

    // S'abonne aux observables du service
    this.pokemonPaginationService.pokemons$.subscribe(pokemons => {this.pokemons = pokemons});
    this.pokemonPaginationService.totalPokemons$.subscribe(total => {this.totalPokemons = total});
    this.pokemonPaginationService.offset$.subscribe(offset => {this.currentOffset = offset});

    // Charge les premiers Pokémon si la liste est vide
    // Seulement si l'utilisateur vient directement de l'URL
    if (this.pokemons.length === 0) {
      await this.loadMorePokemons();
    } /*else{
      Sinon, c'est qu'il vient forcément de la page d'accueil. 
      Il y a donc déjà des pokémons de chargés.
    }*/
  }

  ngOnDestroy(): void {
    // Nettoie les souscriptions pour éviter les fuites de mémoire
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }





  /**
   * METHODES
  */
  // Méthode pour charger plus de Pokémon
  async loadMorePokemons(): Promise<void> {

    // Vérifier si un chargement est déjà en cours ou si tous les Pokémon ont été chargés
    if (this.isLoading || (this.totalPokemons > 0 && this.pokemons.length >= this.totalPokemons)) {
      return Promise.resolve();
    }

    // Marquer le début du chargement
    this.isLoading = true;

    try {
      // Utiliser firstValueFrom() pour attendre la première valeur de l'observable
      const data = await firstValueFrom(this.pokemonService.getPokemons(this.itemsPerLoad, this.currentOffset));
  
      // Ajouter les nouveaux Pokémon à la liste existante
      this.pokemons = [...this.pokemons, ...data.results];
  
      // Marquer la fin du chargement
      this.isLoading = false;
      
      // Mettre à jour le nombre total de Pokémon
      this.totalPokemons = data.total;
  
      // Augmenter l'offset pour le prochain chargement
      this.currentOffset += this.itemsPerLoad;
  
      // Mettre à jour le service d'état
      this.pokemonPaginationService.setPokemons(this.pokemons);
      this.pokemonPaginationService.setTotalPokemons(this.totalPokemons);
      this.pokemonPaginationService.setOffset(this.currentOffset);
      
    } catch (error) {
      // Journaliser l'erreur en cas de problème
      this.loggerService.error('[PokemonSummaryListSidebarComponent - loadMorePokemons] ' + 'Error loading pokemons', error);
  
      // Marquer la fin du chargement même en cas d'erreur
      this.isLoading = false;
    }
  }

  // Selection d'un pokemon dans la liste
  onSelectPokemon(id: number): void {
    this.selectedPokemonId = id;
    this.router.navigate(['/pokemon', id]);
  }
}