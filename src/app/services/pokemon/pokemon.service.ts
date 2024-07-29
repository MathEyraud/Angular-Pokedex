import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, forkJoin, map, mergeMap, Observable, of, switchMap, throwError } from 'rxjs';

import { Pokemon } from 'src/app/models/pokemon';
import { SpritesPokemon } from 'src/app/models/sprites-pokemon';
import { TypePokemon } from 'src/app/models/type-pokemon';
import { environment } from 'src/environments/environment';
import { LoggerService } from '../logger/logger.service';
import { AbilityPokemon } from 'src/app/models/ability-pokemon';
import { StatPokemon } from 'src/app/models/stat-pokemon';
import { MovePokemon, VersionGroupDetail } from 'src/app/models/move-pokemon';
import { ErrorService } from '../error/error.service';
import { EvolutionChain } from 'src/app/models/evolution-chain';





// Interface définissant la structure de la réponse de l'API Pokémon
interface PokemonApiResponse {
  count   : number;                               // Nombre total de Pokémon
  next    : string | null;                        // URL pour la page suivante de résultats
  previous: string | null;                        // URL pour la page précédente de résultats
  results : Array<{ name: string; url: string }>; // Liste des Pokémon avec leur nom et URL
}

interface AbilityDetail {
  ability: {
    name    : string;
    url     : string;
  };
  is_hidden : boolean;
  slot      : number;
}

interface StatDetail {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface StatDetail {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface MoveDetail {
  move: {
    name: string;
    url: string;
  };
  version_group_details: Array<{
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }>;
}





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

    this.loggerService.log("----------------------------------------------------");

    // Création des paramètres de requête pour la pagination
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    // Appel à l'API et traitement de la réponse
    return this.httpClient.get<PokemonApiResponse>(this.apiUrl, { params }).pipe(

      switchMap(response => this.mapApiResponseToPokemonList(response)),

      catchError(this.errorService.handlePokemonError.bind(this.errorService))

    );
  }

  /**
   * Traite la réponse de l'API Pokémon
   * @param response Réponse de l'API
   * @returns Observable avec les Pokémon détaillés et le nombre total
   */
  private mapApiResponseToPokemonList(response: PokemonApiResponse): Observable<{ results: Pokemon[], total: number }> {

    const pokemonDetails$ = this.getPokemonDetails(response.results); 

    return pokemonDetails$.pipe(

      map(pokemons => {

        return(
          {
            results: pokemons,
            total: response.count,
          }
        )

      })
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
        mergeMap(detail => {
          if (detail === null || detail === undefined) {
            return of(null); // Continue avec les autres Pokémons en renvoyant un Observable de null
          }
          
          // Si le détail n'est pas nul, appelle createPokemonFromDetail
          return this.createPokemonFromDetail(detail);
        })
      );
    });

    // Utilisation de forkJoin pour attendre que toutes les requêtes soient complétées
    return forkJoin(detailRequests$).pipe(
      // Filtre les détails pour éliminer les valeurs null
      map(details => details.filter(detail => detail !== null) as Pokemon[])
    );
  }

  

  /*private getPokemonDetails(pokemonList: Array<{ url: string }>): Observable<Pokemon[]> {

    // Création d'un tableau d'observables pour chaque requête de détail
    const detailRequests$ = pokemonList.map(pokemon => {
      return this.getPokemonDetail(pokemon.url)
    });
    
    // Exécution parallèle de toutes les requêtes et mapping des résultats
    return forkJoin(detailRequests$).pipe(

      map(details => {

        const filteredDetails = details.filter(detail => detail !== null && detail !== undefined);

        if (filteredDetails.length !== details.length) {
          this.loggerService.log("[PokemonService - getPokemonDetails] Some details are null or undefined");
        }

        return filteredDetails.map(detail => this.createPokemonFromDetail(detail)).filter(pokemon => pokemon !== null);
      })
    );
  }*/


  /**
   * Crée un objet Pokemon à partir des détails reçus de l'API
   * @param detail Détails du Pokémon reçus de l'API
   * @returns Objet Pokemon
   */
  // TODO : PROBLEME ICI => detail arrive NULL
  createPokemonFromDetail(detail: any) : Observable<Pokemon> {

    this.loggerService.log("detail : ", detail)

    // Création des objets de type pour le Pokémon
    const type1 = new TypePokemon(
        detail.types[0]?.type.name,
        detail.types[0]?.type.url
    );
    
    const type2 = detail.types[1] ? new TypePokemon(
        detail.types[1]?.type.name,
        detail.types[1]?.type.url
    ) : null;

    // Création du tableau de types, en filtrant les nulls
    const types: TypePokemon[] = [type1, type2].filter((type): type is TypePokemon => type !== null);

    // Création de l'objet sprites pour le Pokémon
    const sprites = new SpritesPokemon(
        detail.sprites.back_default,
        detail.sprites.back_female,
        detail.sprites.back_shiny,
        detail.sprites.back_shiny_female,
        detail.sprites.front_default,
        detail.sprites.front_female,
        detail.sprites.front_shiny,
        detail.sprites.front_shiny_female,
    );

    // Récupération de l'image officielle du Pokémon
    const photo = detail.sprites.other["official-artwork"].front_default;

    // Création des objets Ability
    const abilities: AbilityPokemon[] = detail.abilities.map((a: AbilityDetail) => 
        new AbilityPokemon(a.ability.name, a.ability.url, a.is_hidden, a.slot)
    );

    // Création des objets Stat
    const stats: StatPokemon[] = detail.stats.map((a: StatDetail) => 
        new StatPokemon(a.base_stat, a.effort, a.stat.name, a.stat.url)
    );

    // Ajouter les attaques ici
    const moves: MovePokemon[] = detail.moves.map((m: MoveDetail) => 
        new MovePokemon(
            m.move.name, 
            m.move.url, 
            m.version_group_details.map((v: any) => 
                new VersionGroupDetail(
                    v.level_learned_at, 
                    v.move_learn_method.name, 
                    v.move_learn_method.url, 
                    v.version_group.name, 
                    v.version_group.url
                )
            )
        )
    );

    const urlSpecies = detail.species.url;

    return this.getEvolutionPokemon(urlSpecies).pipe(
        map(evolutionChain => {
            // Création et retour d'un nouvel objet Pokemon avec la chaîne d'évolution
            return new Pokemon(
                detail.id,
                detail.name,
                types,
                photo,
                sprites,
                detail.height,
                detail.weight,
                detail.base_experience,
                abilities,
                stats,
                moves,
                evolutionChain,
            );
        })
    );
}


  /**
   * Récupère les détails d'un Pokémon spécifique
   * @param url URL de l'API pour les détails du Pokémon
   * @returns Observable avec les détails du Pokémon
   */
  getPokemonDetail(url: string): Observable<any> {

    return this.httpClient.get<any>(url).pipe(

      map(response => {

        // On vérifie que la réponse retourné
        if (!response || Object.keys(response).length === 0) {
          return null;
        }

        return response;
      }),

      catchError(error => {
        this.loggerService.error("[PokemonService - getPokemonDetail] error : ", error);
        return of(null); // Retourne un observable null en cas d'erreur
      })
      
    );
  }

  getEvolutionPokemon(urlSpecies: string): Observable<EvolutionChain> {

    return this.httpClient.get<any>(urlSpecies).pipe(

        switchMap(responseSpecies => {
          const urlEvolutionChain = responseSpecies.evolution_chain.url;
          return this.httpClient.get<any>(urlEvolutionChain);
        }),

        map(evolutionChainData => {
          return new EvolutionChain(evolutionChainData);
        }),

        catchError(error => {
          this.loggerService.error("[PokemonService - getEvolutionPokemon] error : ", error);
          return this.errorService.handlePokemonError(error);
        })
    );
}

}