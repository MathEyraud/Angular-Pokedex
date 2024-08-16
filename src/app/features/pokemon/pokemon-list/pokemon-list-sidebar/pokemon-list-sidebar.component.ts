import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PokemonListComponent } from '../pokemon-list.component';
import { BehaviorSubject, filter, Subject, takeUntil } from 'rxjs';

const ITEMS_PER_LOAD = 25;
const SCROLL_THRESHOLD = 100;

@Component({
  selector: 'app-pokemon-list-sidebar',
  templateUrl: './pokemon-list-sidebar.component.html',
  styleUrls: ['./pokemon-list-sidebar.component.css']
})
export class PokemonListSidebarComponent extends PokemonListComponent implements OnInit, AfterViewInit, OnDestroy{
  
  // -------- //
  // ATTRIBUT //
  // -------- //

  // ViewChild permet d'obtenir une référence à l'élément HTML qui contient la liste des Pokémon
  @ViewChild('sidebarScroll') sidebarScroll !: ElementRef;

  // Utilisation d'un BehaviorSubject pour suivre l'état de chargement initial
  private loadingState$ = new BehaviorSubject<boolean>(false);

  // Utilisation d'un BehaviorSubject pour suivre l'état de chargement initial
  private loadDataInListBar$ = new BehaviorSubject<boolean>(false);

  // Variable pour éviter un scroll a chaque chargement de nouveau pokemon
  private firstRender = false;

  private destroy$ = new Subject<void>();





  // ----- //
  // HOOKS //
  // ----- //
  // Méthode d'initialisation du composant
  override ngOnInit(): void {

    super.ngOnInit();

    this.initRouteParamsSubscription();       // Récupération via la page d'acceuil classique
    this.initPokemonLoadingSubscription();    // S'abonner à la mise à jour du tableau des Pokémon pour savoir quand le premier chargement est terminé
    this.initLoadingStateSubscription();      // Abonnement : Réagit au chargement initial complet
    this.initLoadDataInListBarSubscription(); // Abonnement : Réagit au chargement complet de la barre latérale
  }

  private initRouteParamsSubscription(): void {

    // Si un ID est présent dans les paramètres d'URL, on le récupère
    this.route.params.pipe(

      takeUntil(this.destroy$),
      filter(params => params['id'] != null)

    ).subscribe(params => {
      this.selectedPokemonId = +params['id'];
    });
  }

  private initPokemonLoadingSubscription(): void {

    this.pokemonPaginationService.pokemons$.pipe(

      takeUntil(this.destroy$),
      filter(pokemons => pokemons.length > 0)

    ).subscribe(() => {
      this.loadingState$.next(true);
    });
  }

  private initLoadingStateSubscription(): void {

    this.loadingState$.pipe(

      takeUntil(this.destroy$),
      filter(isComplete => isComplete && !this.firstRender)

    ).subscribe(() => {
      this.checkAndLoadSelectedPokemon();
    });
  }

  private initLoadDataInListBarSubscription(): void {

    this.loadDataInListBar$.pipe(

      takeUntil(this.destroy$),
      filter(isComplete => isComplete)

    ).subscribe(() => {
      this.checkAndLoadSelectedPokemon();
    });
  }

  // Initialisation après le rendu de la vue
  ngAfterViewInit() {
    if (this.sidebarScroll) {
      this.sidebarScroll.nativeElement.addEventListener('scroll', this.onSidebarScroll.bind(this));
    }    
    this.scrollToSelectedPokemon();
  }

  // Méthode de nettoyage lors de la destruction du composant
  override ngOnDestroy() : void{
    
    super.ngOnDestroy();

    if (this.sidebarScroll) {
      this.sidebarScroll.nativeElement.removeEventListener('scroll', this.onSidebarScroll);
    }

    // Nettoyer l'abonnement au BehaviorSubject
    this.loadingState$.complete();
    this.loadDataInListBar$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }





  // -------- //
  // LISTENER //
  // -------- //
  // Écouteur d'événement de défilement
  onSidebarScroll(): void {

    const element = this.sidebarScroll.nativeElement;

    if (element.scrollHeight - element.scrollTop <= element.clientHeight + SCROLL_THRESHOLD) {
      this.loadMorePokemons();
    }
  }





  // -------- //
  // METHODES //
  // -------- //
  // Ajout de la méthode dans onSelectPokemon
  override onSelectPokemon(id: number): void {
    super.onSelectPokemon(id);
    this.scrollToSelectedPokemon();
  }

  // Méthode pour vérifier si le Pokémon sélectionné est dans la liste et charger si nécessaire
  private checkAndLoadSelectedPokemon(): void {

    // Vérifie si le Pokémon sélectionné est déjà dans la liste chargée
    const selectedPokemon = this.pokemons.find(pokemon => pokemon.id === this.selectedPokemonId);

    if (!selectedPokemon) {
      this.loadPokemonBatch();
    
    // Centre la vue si le Pokémon est déjà chargé
    } else {
      this.scrollToSelectedPokemon(); 
    }
  }

  private loadPokemonBatch(): void {

    const estimatedOffset = Math.max(0, this.selectedPokemonId - ITEMS_PER_LOAD);

    if (this.currentOffset < estimatedOffset) {
      this.itemsPerLoad = estimatedOffset + ITEMS_PER_LOAD;
    }

    this.loadMorePokemons();

    setTimeout(() => {
      this.itemsPerLoad = ITEMS_PER_LOAD;
      this.loadingState$.next(true);
    }, 0);
  }


  // Méthode pour centrer la vue sur le Pokémon sélectionné
  scrollToSelectedPokemon() {
      
    const sidebarElement    = this.sidebarScroll.nativeElement;
    
    // Trouver l'élément du Pokémon sélectionné dans la sidebar
    const selectedElement = sidebarElement.querySelector(`#pokemon-${this.selectedPokemonId}`);
    
    if (selectedElement instanceof HTMLElement) {

      // Calculer la position pour centrer l'élément
      const sidebarHeight = sidebarElement.clientHeight;
      const elementTop    = selectedElement.offsetTop;
      const elementHeight = selectedElement.clientHeight;
      
      // Faire défiler pour centrer l'élément avec une animation fluide
      sidebarElement.scrollTo({
        top: elementTop - (sidebarHeight / 2) + (elementHeight / 2),
        behavior: 'smooth',
      });

      this.firstRender = true;
    };
  }
}