import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PokemonBaseList } from '../pokemon-base-list/pokemon-base-list.component';

@Component({
  selector: 'app-pokemon-summary-list-sidebar',
  templateUrl: './pokemon-summary-list-sidebar.component.html',
  styleUrls: ['./pokemon-summary-list-sidebar.component.css']
})
export class PokemonSummaryListSidebarComponent extends PokemonBaseList implements OnInit, AfterViewInit, OnDestroy{
  
  // -------- //
  // ATTRIBUT //
  // -------- //
  @ViewChild('sidebarScroll') 
  sidebarScroll !: ElementRef;

  // ----- //
  // HOOKS //
  // ----- //
  // Méthode d'initialisation du composant
  override ngOnInit(): void {

    super.ngOnInit();

    // Récupération via la page d'acceuil classique
    this.route.params.subscribe(params => {

      let id;

      if (params['id'] != null) {
        this.selectedPokemonId = params['id'];
      }

    })
  }

  ngAfterViewInit() {
    this.sidebarScroll.nativeElement.addEventListener('scroll', this.onSidebarScroll.bind(this));
  }

  // Méthode de nettoyage lors de la destruction du composant
  override ngOnDestroy() : void{
    
    super.ngOnDestroy();

    if (this.sidebarScroll) {
      this.sidebarScroll.nativeElement.removeEventListener('scroll', this.onSidebarScroll);
    }
  }

  // -------- //
  // LISTENER //
  // -------- //
  // Écouteur d'événement de défilement
  onSidebarScroll(): void {
    const element = this.sidebarScroll.nativeElement;
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + this.scrollThreshold) {
      this.loadMorePokemons();
    }
  }
}
