import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-summary-list-sidebar',
  templateUrl: './pokemon-summary-list-sidebar.component.html',
  styleUrls: ['./pokemon-summary-list-sidebar.component.css']
})
export class PokemonSummaryListSidebarComponent implements OnInit, AfterViewInit, OnDestroy{
/**
   * ATTRIBUT
  */
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
    this.loggerService.log('[PokemonSummaryListSidebarComponent - Input searchValue]',searchValue)
  }


  @ViewChild('sidebarScroll') 
  sidebarScroll !: ElementRef;

  





  /**
   * CONSTRUTEUR
  */
  // Constructeur pour injecter les services nécessaires
  constructor(
    private loggerService   : LoggerService, 
    private pokemonService  : PokemonService,
    private route           : ActivatedRoute, // Pour accéder aux paramètres de l'URL
    ) {}





  /**
   * HOOKS
  */
  // Méthode d'initialisation du composant
  ngOnInit(): void {

    // Récupération via la page d'acceuil classique
    this.route.params.subscribe(params => {

      let id;

      if (params['id'] != null) {
        this.selectedPokemonId = params['id'];
      }

    })
    
    this.loadMorePokemons();  // Charger les premiers Pokémon au démarrage
  }

  ngAfterViewInit() {
    this.sidebarScroll.nativeElement.addEventListener('scroll', this.onSidebarScroll.bind(this));
  }

  // Méthode de nettoyage lors de la destruction du composant
  ngOnDestroy() : void{
    // Désinscrire toutes les souscriptions pour éviter les fuites de mémoire
    this.subscriptions.forEach(subscription => subscription.unsubscribe());

    if (this.sidebarScroll) {
      this.sidebarScroll.nativeElement.removeEventListener('scroll', this.onSidebarScroll);
    }
  }





  /**
   * LISTENER
  */
  // Écouteur d'événement de défilement
  onSidebarScroll(): void {
    const element = this.sidebarScroll.nativeElement;
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + this.scrollThreshold) {
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

        this.loggerService.log("[PokemonSummaryListSidebarComponent - loadMorePokemons]Pokemon :", this.pokemons)

        // Journaliser l'erreur en cas de problème
        this.loggerService.log('[PokemonSummaryListSidebarComponent - loadMorePokemons] ' + 'Error loading pokemons', error);

        // Marquer la fin du chargement même en cas d'erreur
        this.isLoading = false;
      }
    });

    // Ajouter la souscription à la liste pour la désinscrire plus tard
    this.subscriptions.push(subscription);
  }
  
  onSelectPokemon(id: number): void {
    this.selectedPokemonId = id;
  }
}
