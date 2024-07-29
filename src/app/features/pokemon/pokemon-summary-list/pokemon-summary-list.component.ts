import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-summary-list',
  templateUrl: './pokemon-summary-list.component.html',
  styleUrls: ['./pokemon-summary-list.component.css']
})
export class PokemonSummaryListComponent implements OnInit {

  /**
   * ATTRIBUT
  */
  // Services injectés
  private scrollThreshold : number = 100;         // Seuil de déclenchement du chargement (en pixels avant le bas de la page)
  pokemons                : Pokemon[] = [];       // Tableau pour stocker les Pokémon chargés
  subscriptions           : Subscription[] = [];  // Tableau pour stocker les souscriptions afin de les désinscrire plus tard
  totalPokemons           : number = 0;           // Nombre total de Pokémon disponibles dans l'API
  currentOffset           : number = 0;           // Offset actuel pour le chargement des Pokémon (utilisé pour la pagination côté serveur)
  itemsPerLoad            : number = 20;          // Nombre de Pokémon à charger à chaque requête
  isLoading               : boolean = false;      // Indicateur de chargement en cours
  selectedPokemonId       : number = 0;

  // Setter pour searchValue (inchangé)
  @Input()
  set searchValue(searchValue : string){
    this.loggerService.log('[PokemonSummaryListComponent - Input searchValue]',searchValue)
  }





  /**
   * CONSTRUTEUR
  */
  // Constructeur pour injecter les services nécessaires
  constructor(
    private loggerService   : LoggerService, 
    private pokemonService  : PokemonService,
    private router          : Router,
    ) {}





  /**
   * HOOKS
  */
  // Méthode d'initialisation du composant
  ngOnInit(): void {
    this.loadMorePokemons();  // Charger les premiers Pokémon au démarrage
  }

  // Méthode de nettoyage lors de la destruction du composant
  ngOnDestroy() : void{
    // Désinscrire toutes les souscriptions pour éviter les fuites de mémoire
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }





  /**
   * LISTENER
  */
  // Écouteur d'événement de défilement
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    // Vérifie si l'utilisateur est proche du bas de la page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - this.scrollThreshold) {
      this.loadMorePokemons();
    }
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
      },

      error: (error) => {

        this.loggerService.log("[PokemonSummaryListComponent - loadMorePokemons] Pokemon :", this.pokemons)

        // Journaliser l'erreur en cas de problème
        this.loggerService.log('[PokemonSummaryListComponent - loadMorePokemons] ' + 'Error loading pokemons', error);

        // Marquer la fin du chargement même en cas d'erreur
        this.isLoading = false;
      }
    });

    // Ajouter la souscription à la liste pour la désinscrire plus tard
    this.subscriptions.push(subscription);
  }

  navigateToDetails(id : number) : void{
    this.router.navigate(['/sidebar', id]);
  }
}