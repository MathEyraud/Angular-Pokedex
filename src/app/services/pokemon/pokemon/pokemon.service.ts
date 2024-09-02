import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, mergeMap, Observable, of, switchMap } from 'rxjs';

import { Pokemon } from 'src/app/models/pokemon/pokemon/pokemon';
import { Moves } from 'src/app/models/moves/moves/moves';

import { environment } from 'src/environments/environment';
import { LoggerService } from '../../logger/logger.service';
import { ErrorService } from '../../error/error.service';

import { PokemonMapper } from 'src/app/mappers/pokemon/pokemon/pokemon.mapper';
import { IPokemon, IPokemonApiResponse } from 'src/app/interfaces/pokemon/pokemon';

// Décorateur Injectable pour que ce service puisse être injecté dans d'autres composants/services
@Injectable({
  providedIn: 'root' // Ce service sera créé en singleton au niveau racine de l'application
})
export class PokemonService {

  /**
   * ATTRIBUT
  */
  private apiUrl = environment.apis.dataPokemon.url;  // URL de l'API Pokémon

  // Constructeur : injection de HttpClient
  constructor(
    private httpClient    : HttpClient,
    private loggerService : LoggerService, 
    private errorService  : ErrorService,
  ) {}





  /**
   * Récupère une liste de data avec pagination
   * @param limit Nombre de data à récupérer
   * @param offset Indice de départ pour la pagination
   * @returns Observable contenant un tableau avec les datas et le nombre total
   */
  getPokemons(limit: number, offset: number): Observable<{ results: Pokemon[], total: number }> {

    // Création des paramètres de requête pour la pagination
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    // Appel à l'API et traitement de la réponse
    return this.httpClient.get<IPokemonApiResponse>(this.apiUrl, { params }).pipe(

      switchMap(response => this.mapApiResponse(response)),
      catchError(error => this.errorService.handlePokemonError(error))
    );
  }

  /**
   * Traite la réponse de l'API
   * @param response Réponse de l'API
   * @returns Observable avec les data détaillés et le nombre total
   */
  private mapApiResponse(response: IPokemonApiResponse): Observable<{ results: Pokemon[], total: number }> {

    return this.getPokemonDetails(response.results).pipe(
      map(pokemons => ({ results: pokemons, total: response.count }))
    );
  }

  /**
   * Récupère les détails de chaque donnée
   * @param dataList Liste des data avec leurs URLs
   * @returns Observable avec un tableau des données détaillés
   */
  private getPokemonDetails(dataList: Array<{ url: string }>): Observable<Pokemon[]> {

    // Mapping de chaque URL pour récupérer ses détails
    const detailRequests$ = dataList.map(data => {

      return this.getPokemonDetail(data.url).pipe(

        // Utilisation de mergeMap pour gérer les cas où le détail est nul (Bug de certain pokemon de l'API)
        mergeMap(detailJSON => {
          
          if (detailJSON === null || detailJSON === undefined) {
            return of(null); // Continue avec les autres Pokémons en renvoyant un Observable de null
          }
          
          // Si le détail n'est pas nul
          return this.createPokemonFromDetail(detailJSON);
        })
      );
    });

    // Utilisation de forkJoin pour attendre que toutes les requêtes soient complétées
    return forkJoin(detailRequests$).pipe(
      // Filtre les détails pour éliminer les valeurs null
      map(details => details.filter(detail => detail !== null) as Pokemon[])
    );
  }

  /**
   * Crée un objet Pokemon à partir des détails reçus de l'API
   * @param detailJSON Détails du Pokémon reçus de l'API
   * @returns Observable contenant un objet Pokemon
   */
  createPokemonFromDetail(detailJSON: IPokemon): Observable<Pokemon> {
    const pokemon = PokemonMapper.mapPokemon(detailJSON); // Mapping IPokemon to Pokemon
    return of(pokemon);                                   // Wrapping the Pokemon object in an Observable
  }

  /**
   * Récupère les détails spécifique d'une data
   * @param url URL de l'API pour les détails
   * @returns Observable avec les détails
  */
  getPokemonDetail(url: string): Observable<any> {

    return this.httpClient.get<IPokemon>(url).pipe(

      map(response => {

        // On vérifie que la réponse retourné
        if (!response || Object.keys(response).length === 0) {
          return null;
        }

        return response;
      }),

      catchError(error => {
        this.errorService.handlePokemonError(error);
        return of(null); // Retourne un observable null en cas d'erreur
      })
      
    );
  }

  // METHODE POUR RECUPERE LES INFORMATIONS DETAILLERS D'UNE ATTAQUE
  getMoveDetails(url: string): Observable<Moves> {
    return this.httpClient.get<Moves>(url).pipe(
        catchError(error => {
          this.loggerService.error("[PokemonService - getMoveDetails] Failed to fetch move details from ${url} : ", error);
          return of(null as any);
        })
    );
  }

  // Utilise le nom ou l'ID pour construire l'URL de l'API et récupérer les détails du Pokémon
  getPokemonDetailByNameOrId(nameOrId: string | number): Observable<Pokemon> {
    return this.httpClient.get<any>(`${this.apiUrl}/${nameOrId}`).pipe(
      map(data => PokemonMapper.mapPokemon(data))
    );
  }
}