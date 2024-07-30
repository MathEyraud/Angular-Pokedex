import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, mergeMap, Observable, of, switchMap } from 'rxjs';

import { Pokemon } from 'src/app/models/pokemon';
import { EvolutionChain } from 'src/app/models/evolution-chain';

import { environment } from 'src/environments/environment';
import { LoggerService } from '../logger/logger.service';
import { ErrorService } from '../error/error.service';

import { PokemonMapper } from 'src/app/mappers/pokemon.mapper';
import { IPokemonApiResponse } from 'src/app/interfaces/pokemon-api-response'; 
import { IPokemon } from 'src/app/interfaces/pokemon-api-reponse-detail';
import { IEvolutionChain } from 'src/app/interfaces/evolution-chain';
import { IPokemonSpecies } from 'src/app/interfaces/specie';





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
   * Récupère une liste de Pokémon avec pagination
   * @param limit Nombre de Pokémon à récupérer
   * @param offset Indice de départ pour la pagination
   * @returns Observable contenant un tableau de Pokémon et le nombre total
   */
  getPokemons(limit: number, offset: number): Observable<{ results: Pokemon[], total: number }> {

    // Création des paramètres de requête pour la pagination
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    // Appel à l'API et traitement de la réponse
    return this.httpClient.get<IPokemonApiResponse>(this.apiUrl, { params }).pipe(

      switchMap(response => this.mapApiResponseToPokemonList(response)),
      catchError(error => this.errorService.handlePokemonError(error))
    );
  }

  /**
   * Traite la réponse de l'API Pokémon
   * @param response Réponse de l'API
   * @returns Observable avec les Pokémon détaillés et le nombre total
   */
  private mapApiResponseToPokemonList(response: IPokemonApiResponse): Observable<{ results: Pokemon[], total: number }> {

    return this.getPokemonDetails(response.results).pipe(
      map(pokemons => ({ results: pokemons, total: response.count }))
    );
  }

  /**
   * Récupère les détails de chaque Pokémon
   * @param pokemonList Liste des Pokémon avec leurs URLs
   * @returns Observable avec un tableau de Pokémon détaillés
   */
  private getPokemonDetails(pokemonList: Array<{ url: string }>): Observable<Pokemon[]> {

    // Mapping chaque URL de Pokémon pour récupérer ses détails
    const detailRequests$ = pokemonList.map(pokemon => {

      return this.getPokemonDetail(pokemon.url).pipe(

        // Utilisation de mergeMap pour gérer les cas où le détail est nul (Bug de certain pokemon de l'API)
        mergeMap(detailJSON => {
          if (detailJSON === null || detailJSON === undefined) {
            return of(null); // Continue avec les autres Pokémons en renvoyant un Observable de null
          }
          
          // Si le détail n'est pas nul, appelle createPokemonFromDetail
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
   * @returns Objet Pokemon
   */
  createPokemonFromDetail(detailJSON: IPokemon) : Observable<Pokemon> {

    return this.getEvolutionPokemon(detailJSON.species.url).pipe(
      map(evolutionChain => {
        const pokemon = PokemonMapper.getData(detailJSON);
        pokemon.evolutionChain = evolutionChain;
        return pokemon;
      })
    );
  }


  /**
   * Récupère les détails d'un Pokémon spécifique
   * @param url URL de l'API pour les détails du Pokémon
   * @returns Observable avec les détails du Pokémon
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
        this.loggerService.error("[PokemonService - getPokemonDetail] error : ", error);
        this.errorService.handlePokemonError(error);
        return of(null); // Retourne un observable null en cas d'erreur
      })
      
    );
  }

  getEvolutionPokemon(urlSpecies: string): Observable<EvolutionChain> {

    return this.httpClient.get<IPokemonSpecies>(urlSpecies).pipe(

      switchMap(responseSpecies => {
        const urlEvolutionChain = responseSpecies.evolution_chain.url;
        return this.httpClient.get<IEvolutionChain>(urlEvolutionChain);
      }),

      map(evolutionChainData => {
        return new EvolutionChain(evolutionChainData);
      }),

      catchError(error => {
        this.loggerService.error("[PokemonService - getEvolutionPokemon] error : ", error);
        return this.errorService.handleEvolutionChainError(error);
      })
    );
  }

}