import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { PokemonPaginationService } from 'src/app/services/pokemon/pokemon-pagination.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { PokemonListComponent } from '../pokemon-list.component';

@Component({
  selector: 'app-pokemon-list-home',
  templateUrl: './pokemon-list-home.component.html',
  styleUrls: ['./pokemon-list-home.component.css']
})
export class PokemonListHomeComponent extends PokemonListComponent implements OnInit {

  // ------------ //
  // CONSTRUCTEUR //
  // ------------ //
  constructor(
    loggerService             : LoggerService, 
    pokemonService            : PokemonService,
    route                     : ActivatedRoute,           // Pour accéder aux paramètres de l'URL
    pokemonPaginationService  : PokemonPaginationService, // Service de gestion de la pagination
    private router            : Router
  ) {
    super(loggerService, pokemonService,route, pokemonPaginationService);
  }

  // -------- //
  // LISTENER //
  // -------- //
  // Écouteur d'événement de défilement
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    // Vérifie si l'utilisateur est proche du bas de la page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - this.scrollThreshold) {
      this.loadMorePokemons();
    }
  }

  // -------- //
  // METHODES //
  // -------- //
  override onSelectPokemon(id : number) : void{
    this.router.navigate(['/pokemon', id]);
  }
}