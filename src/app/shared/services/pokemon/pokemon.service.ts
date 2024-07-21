import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { PhotoPokemon } from 'src/app/models/photo-pokemon';
import { Pokemon } from 'src/app/models/pokemon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  /**
   * ATTRIBUTS
   */
  private httpClient: HttpClient;                     // Déclaration d'un attribut pour HttpClient
  private apiUrl = environment.apis.dataPokemon.url;  // URL de l'API, obtenue des variables d'environnement

  // Constructeur pour injecter HttpClient
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Méthode pour obtenir les informations des Pokémon
   */
  getPokemons(): Observable<PhotoPokemon[]> {

    // Effectue une requête GET à l'API pour obtenir la liste des Pokémon
    return this.httpClient.get<any>(this.apiUrl).pipe(

      // Transforme la réponse pour extraire le tableau des résultats
      map(data => data.results),

      // Utilise switchMap pour enchaîner les requêtes pour chaque URL de détail des Pokémon
      switchMap((results: any[]) => {

        // Mappe chaque résultat à une requête de détail de Pokémon
        const detailRequests = results.map(result => this.getPokemonDetail(result.url));
        
        // Utilise forkJoin pour attendre que toutes les requêtes de détail soient terminées
        return forkJoin(detailRequests);
      }),

      // Transforme les détails des Pokémon en instances de PhotoPokemon
      map((details: any[]) => {

        return details.map(detail => {
          
          // URL de la photo du Pokémon
          const url = detail.sprites.front_default;

          // Création d'une instance de Pokemon avec les détails récupérés
          const pokemon   = new Pokemon();
          pokemon.id      = detail.id;
          pokemon.name    = detail.name;
          pokemon.type1   = detail.types[0]?.type.name;
          pokemon.type2   = detail.types[1]?.type.name;
          pokemon.photos  = detail.sprites;

          // Retourne une nouvelle instance de PhotoPokemon avec l'URL et les détails du Pokémon
          return new PhotoPokemon(url, pokemon);
        });
      })
    );
  }

  /**
   * Méthode pour obtenir les détails d'un Pokémon via son URL
   */
  getPokemonDetail(url: string): Observable<any> {
    // Effectue une requête GET à l'URL donnée pour obtenir les détails d'un Pokémon
    return this.httpClient.get<any>(url);
  }
}
