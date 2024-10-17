import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PokemonListComponent } from '../pokemon-list.component';
import { debounceTime, filter, fromEvent, Subject, takeUntil } from 'rxjs';
import { PokemonSummaryTileComponent } from '../../pokemon-summary/pokemon-summary-tile/pokemon-summary-tile.component';
import { PokemonTypeSizeService } from 'src/app/services/pokemon/types/pokemon-type-size.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonPaginationService } from 'src/app/services/pokemon/pokemon/pokemon-pagination.service';

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

  // Obtenir une référence à tous les PokemonSummaryTileComponent
  @ViewChildren(PokemonSummaryTileComponent, { read: ElementRef }) tileElements!: QueryList<ElementRef>;

  private destroy$ = new Subject<void>();                 // Subject pour gérer la destruction du composant
  private resizeObserver: ResizeObserver | null = null;   // ResizeObserver pour détecter les changements de taille
  private updateTypeSizeTimeout: number | null = null;    // Timeout pour le rafraichissement de la taille des types

  constructor(
    private cdr                                   : ChangeDetectorRef,
    private typeSizeService                       : PokemonTypeSizeService,
    private ngZone                                : NgZone, 
    protected override loggerService              : LoggerService, 
    protected override pokemonService             : PokemonService,
    protected override route                      : ActivatedRoute,           // Pour accéder aux paramètres de l'URL
    protected override pokemonPaginationService   : PokemonPaginationService, // Service de gestion de la pagination
    protected override router                     : Router,
  ) {
    super(loggerService,pokemonService,route,pokemonPaginationService,router);
  }




  // ----- //
  // HOOKS //
  // ----- //
  override async ngOnInit() {

    // 1. Récupération des Pokémon déjà chargés.
    // 2. S'ils ne sont pas chargés, il y a un premier chargement (Cas où l'utilisateur vient directement via l'URL.)
    await super.ngOnInit();

    // Récupération de l'ID du pokemon à afficher avec vérif
    await this.initRouteParamsSubscription();
    
    // On vérifie que il y a des pokémons dans la sideBar de gauche
    // Si c'est le cas, on va vérifier que le Pokémon que l'on recherche est dedans
    if (this.pokemons.length > 0) {await this.checkAndLoadSelectedPokemon();} 

    // Sinon, c'est que l'on vient d'arriver sur la page via l'URL 
    // et donc il faut charger tous les pokémons Jusqu'à celui que l'on recherche
    // Puis on scroll
    else {await this.loadPokemonBatch();}

    // Défilement vers le Pokémon sélectionné
    setTimeout(() => {
      this.scrollToSelectedPokemon();
    }, 0);
  }

  // Initialisation après le rendu de la vue
  ngAfterViewInit() {

    if (this.sidebarScroll) {this.sidebarScroll.nativeElement.addEventListener('scroll', this.onSidebarScroll.bind(this));}    

    // Configuration du ResizeObserver
    this.setupResizeObserver();
    
    // Déclencher une mise à jour initiale
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.updateTypeSize();
        });
      },0);
    });

    // Écouter les changements dans la liste des tiles
    this.tileElements.changes.subscribe(() => {this.updateTypeSize();});

    // Écouteur de redimensionnement de la fenêtre
    fromEvent(window, 'resize')
      .pipe(debounceTime(200), takeUntil(this.destroy$))
      .subscribe(() => this.updateTypeSize());
    
    // Défilement vers le Pokémon sélectionné
    setTimeout(() => {
      this.scrollToSelectedPokemon();
    }, 0);
  }

  // Méthode de nettoyage lors de la destruction du composant
  override ngOnDestroy() : void{
    
    super.ngOnDestroy();
    this.cleanupResizeObserver();

    // Suppression des écouteurs
    if (this.sidebarScroll) {this.sidebarScroll.nativeElement.removeEventListener('scroll', this.onSidebarScroll);}
    if (this.updateTypeSizeTimeout) {clearTimeout(this.updateTypeSizeTimeout);}

    // Nettoyer l'abonnement au BehaviorSubject
    this.destroy$.next();
    this.destroy$.complete();
  }





  // Méthode pour configurer le ResizeObserver
  private setupResizeObserver() {

    // Si un ResizeObserver existe déjà, on le déconnecte pour éviter les doublons
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    // Création d'un nouveau ResizeObserver : Utilisation de NgZone pour s'assurer que la détection de changements d'Angular est déclenchée
    this.resizeObserver = new ResizeObserver(() => {
      this.ngZone.run(() => {
        this.updateTypeSize();
      });
    });

    // Observation de chaque élément tile (carte de Pokémon)
    this.tileElements.forEach(element => {
      this.resizeObserver!.observe(element.nativeElement);
    });

    // Observer le conteneur parent pour les changements de taille globaux
    const parentContainer = this.sidebarScroll.nativeElement;
    this.resizeObserver.observe(parentContainer);
  }

  // Méthode pour nettoyer le ResizeObserver
  private cleanupResizeObserver() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  // Méthode pour mettre à jour la taille des badges des types
  private updateTypeSize() {

    // Si un timeout précédent existe, on l'annule pour éviter des calculs inutiles
    if (this.updateTypeSizeTimeout) {
      clearTimeout(this.updateTypeSizeTimeout);
    }

    // On programme un nouveau calcul après un court délai (100ms)
    // Cela permet de regrouper plusieurs appels rapprochés en un seul calcul
    this.updateTypeSizeTimeout = window.setTimeout(() => {
      this.calculateAndApplyTypeSize();
    }, 100);
  }

  private calculateAndApplyTypeSize() {

    // Initialisation des variables qui détermineront le comportement final
    let shouldWrap = false;     // Indique si les types doivent être affichés sur plusieurs lignes
    let shouldDisplay = true;   // Indique si les types doivent être affichés ou non
  
    // On parcourt tous les éléments de tuile (cartes Pokémon) dans la sidebar
    this.tileElements.forEach(element => {

      // Sélection des éléments DOM nécessaires au calcul
      const containerNameTypes  = element.nativeElement.querySelector('.container-name-types');
      const nameElement         = element.nativeElement.querySelector('.label-name');
      const containerTypes      = element.nativeElement.querySelector('.container-types');

      // Vérification que tous les éléments nécessaires sont présents
      if (containerNameTypes && nameElement && containerTypes) {

        // Calcul des dimensions
        const containerNameTypesWidth = containerNameTypes.offsetWidth;
        const labelNameWidth          = nameElement.offsetWidth;
        const containerTypesWidth     = containerTypes.scrollWidth;
        const availableSpace          = containerNameTypesWidth - labelNameWidth - 8;

        // Si l'espace disponible est insuffisant pour afficher les types sur une ligne
        if (availableSpace <= containerTypesWidth) {

          shouldWrap = true;  // On indique qu'il faut passer sur plusieurs lignes
          
          // On vérifie maintenant s'il y a assez d'espace pour afficher les types sur deux lignes
          const containerID = element.nativeElement.querySelector('.label-id');

          if (containerID) {

            const containerIDWidth = containerID.offsetWidth;

            // Si la largeur de l'ID est inférieure à la largeur des types,
            // cela signifie qu'il n'y a pas assez d'espace même sur deux lignes
            if (containerIDWidth < containerTypesWidth) {
              shouldDisplay = false;  // On décide de ne pas afficher les types du tout
            }
          }
        }
      }
    });

    // Application des changements de manicore
    this.ngZone.run(() => {
      
      // On met à jour les services avec les nouvelles valeurs calculées
      this.typeSizeService.setWrapTypes(shouldWrap);
      this.typeSizeService.setDisplayType(shouldDisplay);
      
      // On force la détection des changements pour mettre à jour la vue
      this.cdr.detectChanges();
    });
  }





  // -------- //
  // LISTENER //
  // -------- //
  // Gestion du défilement de la sidebar
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
  onSelectPokemonFromOther(id: number): void {
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
      // TODO : Il faudra implémenter cette fonctionnalité
      if (isNaN(this.selectedPokemonId)) {
        this.router.navigate(['/notfound']);
      }

      // Vérifier si l'ID du Pokémon est valide
      // Rediriger vers la page notfound cas échéant
      if (this.selectedPokemonId < 1) {
        this.router.navigate(['/notfound']);
      }

      // TODO : Vérifiez que l'on ne requête pas l'i D d'un Pokémon qui n'existe pas.
      // Il faudrait savoir combien d'id de Pokémon il y a et comparer à l'id sélectionné
      // Regarder ce que l'API nous retourne si le pokemon n'existe pas

    });
  }

  // Méthode pour vérifier si le Pokémon sélectionné est dans la liste et charger si nécessaire
  private async checkAndLoadSelectedPokemon() : Promise<void> {

    // Vérifie si le Pokémon sélectionné est déjà dans la liste chargée
    const selectedPokemon = this.pokemons.find(pokemon => pokemon.id === this.selectedPokemonId);

    // Charge plus de pokemon si le pokemon n'est pas dans la liste
    if (!selectedPokemon) {await this.loadPokemonBatch();} 
  }

  // Charger plus de pokemon à partir d'un pokemon de référence
  // Cela assure que le pokemon sera dans la liste
  private async loadPokemonBatch(): Promise<void> {

    // Modification des données pour la récupération des pokemons
    const estimatedOffset = Math.max(0, this.selectedPokemonId - ITEMS_PER_LOAD);

    if (this.currentOffset < estimatedOffset) {this.itemsPerLoad = estimatedOffset + ITEMS_PER_LOAD;}

    // Charger plus de pokemon puis scroll
    await this.loadMorePokemons().then(() => {
      this.itemsPerLoad = ITEMS_PER_LOAD;
    });
  }


  // Méthode pour centrer la vue sur le Pokémon sélectionné
  private async scrollToSelectedPokemon() : Promise<void> {
      
    const sidebarElement = this.sidebarScroll.nativeElement;
    
    // Trouver l'élément du Pokémon sélectionné dans la sidebar
    const selectedElement = sidebarElement.querySelector(`#pokemon-${this.selectedPokemonId}`);
    
    if (selectedElement) {

      // Calculer la position pour centrer l'élément
      const sidebarHeight = sidebarElement.clientHeight;
      const elementTop    = selectedElement.offsetTop;
      const elementHeight = selectedElement.clientHeight
      
      // Faire défiler pour centrer l'élément avec une animation fluide
      sidebarElement.scrollTo({
        top: elementTop - (sidebarHeight / 2) + (elementHeight / 2),
        behavior: 'smooth',
      });
    };
  }
}