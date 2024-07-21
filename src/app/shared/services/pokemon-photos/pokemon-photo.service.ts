import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, map, Observable, of } from 'rxjs';
import { PhotoPokemon } from 'src/app/models/photo-pokemon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonPhotoService {

  /**
   * ATTRIBUT
  */
  private httpClient      : HttpClient;
  urlDatabasePhotoPokemon : string = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/';
  extensionPhotoPokemon   : string = '.png';

  constructor(httpClient : HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Retourner la listes des selfies
  */
  /*getAll() : PhotoPokemon[]{

    // Création du tableau
    let photosPokemon: PhotoPokemon[] = [];

    // Ajout des données
    photosPokemon.push({
      url       : this.urlDatabasePhotoPokemon + "001" + this.extensionPhotoPokemon,
      pokemon   : {
        id      :'001',
        name    :'Bulbizarre',
        type1   :'Plante', 
        type2   :'Poison', 
        photos  :[]
      }
    },
    {
      url       : this.urlDatabasePhotoPokemon + "002" + this.extensionPhotoPokemon,
      pokemon   : {
        id      :'002',
        name    :'Herbizarre',
        type1   :'Plante', 
        type2   :'Poison', 
        photos  :[]
      }
    },
    {
      url       : this.urlDatabasePhotoPokemon + "003" + this.extensionPhotoPokemon,
      pokemon   : {
        id      :'003',
        name    :'Florizarre',
        type1   :'Plante', 
        type2   :'Poison', 
        photos  :[]
      }
    })
    return photosPokemon;
  }*/

  /*getAllAPI() : Observable<PhotoPokemon[]>{

    const photosPokemon = this.getAll();
    //return of(photosPokemon);
    return interval(1000).pipe(
      map(value => [{
        url       : this.urlDatabasePhotoPokemon + "001" + this.extensionPhotoPokemon,
        pokemon   : {
          id      : value.toString(),
          name    :'Bulbizarre',
          type1   :'Plante', 
          type2   :'Poison', 
          photos  :[]
        }
      }])
    )
    
    return this.httpClient.get<any>(environment.apis.dataPokemon.url)
  }*/
}
