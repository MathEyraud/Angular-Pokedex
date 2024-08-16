import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  protected scrollThreshold : number = 100;         // Seuil de déclenchement du chargement (en pixels avant le bas de la page)


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
  ngOnInit(): void {

    // S'abonne aux observables du service
    this.pokemonPaginationService.pokemons$.subscribe(pokemons => {this.pokemons = pokemons});
    this.pokemonPaginationService.totalPokemons$.subscribe(total => {this.totalPokemons = total});
    this.pokemonPaginationService.offset$.subscribe(offset => {this.currentOffset = offset});

    // Charge les premiers Pokémon si la liste est vide
    if (this.pokemons.length === 0) {
      this.loadMorePokemons();
    }
  }

  ngOnDestroy(): void {
    // Nettoie les souscriptions pour éviter les fuites de mémoire
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }





  /**
   * METHODES
  */
  // Méthode pour charger plus de Pokémon
  loadMorePokemons(): void {

    // Vérifier si un chargement est déjà en cours ou si tous les Pokémon ont été chargés
    if (this.isLoading || (this.totalPokemons > 0 && this.pokemons.length >= this.totalPokemons)) {
      return;
    }

    // Marquer le début du chargement
    this.isLoading = true;

    // Appeler le service pour obtenir les Pokémon
    const subscription = this.pokemonService.getPokemons(this.itemsPerLoad, this.currentOffset).subscribe({

      next: (data) => {

        // Ajouter les nouveaux Pokémon à la liste existante
        this.pokemons = [...this.pokemons, ...data.results];

        // Mettre à jour le nombre total de Pokémon
        this.totalPokemons = data.total;

        // Augmenter l'offset pour le prochain chargement
        this.currentOffset += this.itemsPerLoad;

        // Marquer la fin du chargement
        this.isLoading = false;

        // Update the state service
        this.pokemonPaginationService.setPokemons(this.pokemons);
        this.pokemonPaginationService.setTotalPokemons(this.totalPokemons);
        this.pokemonPaginationService.setOffset(this.currentOffset);
      },

      error: (error) => {

        // Journaliser l'erreur en cas de problème
        this.loggerService.error('[PokemonSummaryListSidebarComponent - loadMorePokemons] ' + 'Error loading pokemons', error);

        // Marquer la fin du chargement même en cas d'erreur
        this.isLoading = false;
      }
    });

    // Ajouter la souscription à la liste pour la désinscrire plus tard
    this.subscriptions.push(subscription);
  }

  onSelectPokemon(id: number): void {
    this.selectedPokemonId = id;
    this.router.navigate(['/pokemon', id]);
  }
}