import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PhotoPokemon } from 'src/app/models/photo-pokemon';
import { Pokemon } from 'src/app/models/pokemon';
import { LoggerService } from 'src/app/shared/services/logger/logger.service';
import { PokemonPhotoService } from 'src/app/shared/services/pokemon-photos/pokemon-photo.service';
import { PokemonService } from 'src/app/shared/services/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-summary-list',
  templateUrl: './pokemon-summary-list.component.html',
  styleUrls: ['./pokemon-summary-list.component.css']
})
export class PokemonSummaryListComponent implements OnInit {

  /**
   * ATTRIBUT
  */
  private loggerService       : LoggerService;
  private pokemonPhotoService : PokemonPhotoService;
  private pokemonService      : PokemonService;

  photosPokemon               : PhotoPokemon[] = [];
  pokemons                    : any[] = [];
  subscriptions               : Subscription[] = [];
  isAddPhoto                  : Boolean = false;

  @Input()
  set searchValue(searchValue : string){
    this.loggerService.log('PokemonPhotosListComponent',searchValue)
  }

  /**
   * CONSTRUTEUR
  */
  constructor(
    loggerService       : LoggerService, 
    pokemonPhotoService : PokemonPhotoService,
    pokemonService      : PokemonService,
    ) {
    this.loggerService        = loggerService;
    this.pokemonPhotoService  = pokemonPhotoService;
    this.pokemonService       = pokemonService;
  }


  /**
   * METHODE
  */
  ngOnInit(): void {

    const subscription = this.pokemonService.getPokemons().subscribe((data) => {
      this.photosPokemon = data;
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy() : void{
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  showAddPhoto() : void {
    this.isAddPhoto = !this.isAddPhoto;
  }

  hideAddPhoto() : void {
    this.isAddPhoto = false;
  }

}