import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { PokemonPaginationService } from 'src/app/services/pokemon/pokemon/pokemon-pagination.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon/pokemon.service';
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
    router                    : Router,
  ) {
    super(loggerService, pokemonService,route, pokemonPaginationService,router);
  }

  // -------- //
  // LISTENER //
  // -------- //
  // Écouteur d'événement de défilement
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight;

    if (this.isLoading) return;

    // Vérifie si l'utilisateur est proche du bas de la page
    if (scrollPosition >= threshold) {
      this.loadMorePokemons();
    }
  }
}