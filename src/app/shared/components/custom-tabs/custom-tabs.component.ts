import { Component, ContentChildren, Input, QueryList, Directive, TemplateRef, ElementRef, ViewChild, ChangeDetectorRef, AfterViewInit, SimpleChanges } from '@angular/core';
import { tabAnimations } from './custom-tabs.animations';

// pokemon-tab-content.directive.ts
// import { Directive, Input, TemplateRef } from '@angular/core';
// Définition d'une directive personnalisée pour le contenu des onglets
@Directive({
  selector: '[appPokemonTabContent]'
})
export class TabContentDirective {
  @Input() title!: string;                              // Déclaration d'une propriété d'entrée 'title' pour le titre de l'onglet
  constructor(public templateRef: TemplateRef<any>) {}  // Injection de TemplateRef pour accéder au contenu du template
}

@Component({
  selector: 'app-custom-tabs',
  templateUrl: './custom-tabs.component.html',
  styleUrls: ['./custom-tabs.component.css'],
  animations: [tabAnimations.tabTransition]

})
export class CustomTabsComponent implements AfterViewInit {

  // Récupère tous les éléments utilisant la directive TabContentDirective
  @ContentChildren(TabContentDirective) tabContents!: QueryList<TabContentDirective>;

  // Référence à l'élément du DOM contenant les contenus des onglets
  @ViewChild('tabContentContainer', { static: true }) tabContentContainer!: ElementRef;

  selectedTabContent  : TabContentDirective | null = null;  // Référence à l'onglet actuellement sélectionné
  mutationObserver    !: MutationObserver;
  isMutating          : boolean = false;                    // Indicateur pour gérer l'état de mutation
  selectedTab         = 0;                                  // Index de l'onglet actuellement sélectionné
  animationState      = 0;                                  // État de l'animation, utilisé pour déclencher des transitions
  direction           = '';                                 // Direction de l'animation ('1' pour avant, '-1' pour arrière)

  // Injection du ChangeDetectorRef pour forcer la détection des changements
  constructor(
    private changeDetectorRef: ChangeDetectorRef,       
  ) {}





  
  ngAfterViewInit() {

    this.initTabContent();        // Initialise le contenu de l'onglet sélectionné
    this.updateContainerHeight(); // Met à jour la hauteur du conteneur pour correspondre au contenu

    // Créez un MutationObserver pour écouter les changements dans le DOM
    this.mutationObserver = new MutationObserver((mutations) => {

      // Pour chaque mutation observée
      mutations.forEach((mutation) => {

        // Vérifiez si nous sommes dans un état de mutation bloqué
        if (!this.isMutating) {
          if (mutation.type === 'characterData') {
            this.updateContainerHeight(); // Mettez à jour la hauteur du conteneur si le contenu change
          }
        }
      });
    });

    // Démarrez l'observation sur l'élément de conteneur d'onglets
    this.mutationObserver.observe(this.tabContentContainer.nativeElement, {
      childList: true,    // Observer les changements dans les enfants
      subtree: true,      // Observer les changements descendants
      characterData: true,// Observer les changements de texte
      attributes: true,
    });
  }
  
  ngOnDestroy() {
    // Déconnectez l'observateur lors de la destruction du composant
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }





  // Méthode pour initialiser l'onglet actif
  private initTabContent() {

    // Convertit la liste QueryList en tableau pour manipulation
    const tabArray = this.tabContents?.toArray();

    if (tabArray && tabArray.length > 0) {

      // Sélectionne le contenu de l'onglet en fonction de l'index
      this.selectedTabContent = tabArray[this.selectedTab] || null;

      // Forcer la détection des changements après la mise à jour de l'onglet sélectionné
      this.changeDetectorRef.detectChanges();

    } else {
      this.selectedTabContent = null;
    }

  }

  // Méthode pour mettre à jour dynamiquement la hauteur du conteneur des onglets
  private updateContainerHeight() {

    if (this.tabContentContainer && this.selectedTabContent) {
      
      const content = this.tabContentContainer.nativeElement;           // Accède à l'élément DOM du conteneur
      const activeTab = content.querySelector('.tab-content.active');   // Sélectionne le contenu actif de l'onglet

      if (activeTab) {
        // Utilisation de requestAnimationFrame pour s'assurer que le DOM a été mis à jour
        // Définit la hauteur du conteneur pour correspondre au contenu actif
        requestAnimationFrame(() => {
          content.style.height = `${activeTab.offsetHeight}px`;
        });      
      }
    }
  }

  // Méthode pour gérer la sélection d'un onglet
  selectTab(index: number) {

    

    if (index !== this.selectedTab) {

      // Désactiver temporairement l'observation des mutations
      this.isMutating = true;
      this.mutationObserver.disconnect();

      // Définit la direction de l'animation
      this.direction = index > this.selectedTab ? '1' : '-1';      
      this.selectedTab = index;
      
      // Incrémente l'état d'animation pour déclencher la transition
      this.animationState++;
      
      // Initialise le contenu du nouvel onglet sélectionné
      this.initTabContent();

      // Réactivez l'observation des mutations
      this.mutationObserver.observe(this.tabContentContainer.nativeElement, {
        childList: true,
        subtree: true,
        characterData: true
      });

      // Réinitialiser l'indicateur de mutation
      this.isMutating = false; 
    }
  }
}