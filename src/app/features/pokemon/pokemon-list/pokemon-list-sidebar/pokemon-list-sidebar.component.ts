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

  private destroy$ = new Subject<void>();

  isLoadingPokemonDetail : boolean = false;      // Indicateur de chargement en cours






  // ----- //
  // HOOKS //
  // ----- //
  // Méthode d'initialisation du composant
  override async ngOnInit() {

    // 1. Récupération des Pokémon déjà chargés.
    // 2. S'ils ne sont pas chargés, il y a un premier chargement (Cas où l'utilisateur vient directement via l'URL.)
    await super.ngOnInit().then(()=>{

      // Récupération de l'ID du pokemon à afficher avec vérif
      this.initRouteParamsSubscription().then(()=>{ 

        // On vérifie que il y a des pokémons dans la sideBar de gauche
        // Si c'est le cas, on va vérifier que le Pokémon que l'on recherche est dedans
        if (this.pokemons.length > 0) {
          this.checkAndLoadSelectedPokemon();

        // Sinon, c'est que l'on vient d'arriver sur la page via l'URL 
        // et donc il faut charger tous les pokémons Jusqu'à celui que l'on recherche
        // Puis on scroll
        } else {
          this.loadPokemonBatch().then(()=>{
            this.scrollToSelectedPokemon(); 
          });
        }
      });       
      
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
    this.destroy$.next();
    this.destroy$.complete();
  }





  // -------- //
  // LISTENER //
  // -------- //
  // Écouteur d'événement de défilement
  private onSidebarScroll(): void {

    const element = this.sidebarScroll.nativeElement;

    if (element.scrollHeight - element.scrollTop <= element.clientHeight + SCROLL_THRESHOLD) {
      this.loadMorePokemons();
    }
  }

  // Selection d'un pokemon dans la sideBar
  override onSelectPokemon(id: number): void {
    super.onSelectPokemon(id);
    this.scrollToSelectedPokemon()
  }

  // Méthode lorsque l'utilisateur clique sur un pokemon de sa chaine d'évolution
  onSelectFromEvolutionList(id: number): void {
    super.onSelectPokemon(id);
    this.checkAndLoadSelectedPokemon();
  }





  // -------- //
  // METHODES //
  // -------- //
  // Récupération de l'ID du pokemon lors du 1er chargement
  private async initRouteParamsSubscription() {

    // Si un ID est présent dans les paramètres d'URL, on le récupère
    this.route.params.pipe(

      takeUntil(this.destroy$),
      filter(params => params['id'] != null)

    ).subscribe(params => {

      this.selectedPokemonId = +params['id'];

      // Si l'utilisateur cherche à trouver le Pokémon via son nom directement dans l'URL
      // On le renvoie aussi vers la page d'erreur
      if (isNaN(this.selectedPokemonId)) {
        this.router.navigate(['/notfound']);
      }

      // Vérifier si l'ID du Pokémon est valide
      // Rediriger vers la page notfound cas échéant
      if (this.selectedPokemonId < 1 || this.selectedPokemonId > this.totalPokemons) {
        this.router.navigate(['/notfound']);
      }

      // TODO : Vérifiez que l'on ne requête pas l'i D d'un Pokémon qui n'existe pas.
      // Il faudrait savoir combien d'id de Pokémon il y a et comparer à l'id sélectionné

    });
  }

  // Méthode pour vérifier si le Pokémon sélectionné est dans la liste et charger si nécessaire
  private async checkAndLoadSelectedPokemon() : Promise<void> {

    // Vérifie si le Pokémon sélectionné est déjà dans la liste chargée
    const selectedPokemon = this.pokemons.find(pokemon => pokemon.id === this.selectedPokemonId);

    if (!selectedPokemon) {
      await this.loadPokemonBatch();
    
    // Centre la vue si le Pokémon est déjà chargé
    } else {
      this.scrollToSelectedPokemon(); 
    }
  }

  // Charger plus de pokemon à partir d'un pokemon de référence
  // Cela assure que le pokemon sera dans la liste
  private async loadPokemonBatch(): Promise<void> {

    // Modification des données pour la récupération des pokmons
    const estimatedOffset = Math.max(0, this.selectedPokemonId - ITEMS_PER_LOAD);

    if (this.currentOffset < estimatedOffset) {
      this.itemsPerLoad = estimatedOffset + ITEMS_PER_LOAD;
    }

    // Charger plus de pokemon puis scroll
    await this.loadMorePokemons().then(() => {
      setTimeout(() => {
        this.itemsPerLoad = ITEMS_PER_LOAD;
        this.scrollToSelectedPokemon();
      }, 0);
    });
  }


  // Méthode pour centrer la vue sur le Pokémon sélectionné
  private async scrollToSelectedPokemon() : Promise<void> {
      
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
    };
  }
}