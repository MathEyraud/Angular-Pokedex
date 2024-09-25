import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../logger/logger.service';
import { ErrorService } from '../../error/error.service';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { PokemonSpecies } from 'src/app/models/pokemon/pokemon-species/pokemon-species';
import { IPokemonSpecies } from 'src/app/interfaces/pokemon-species/pokemon-species';
import { PokemonSpeciesMapper } from 'src/app/mappers/pokemon/pokemon-species/pokemon-species.mapper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonSpeciesService {

  constructor(
    private httpClient    : HttpClient,
    private loggerService : LoggerService, 
    private errorService  : ErrorService,
  ) { }

  // URL de l'API Pokémon des species
  private apiUrlPokemonSpecies = environment.apis.dataSpeciesPokemon.url;  

  getPokemonSpecies(urlSpecies: string): Observable<PokemonSpecies> {

    return this.httpClient.get<IPokemonSpecies>(urlSpecies).pipe(

      map(response => PokemonSpeciesMapper.mapData(response)),

      catchError(error => {
        this.loggerService.error("[PokemonSpeciesService - getPokemonSpecies] error : ", error);
        return this.errorService.handlePokemonSpeciesError(error);
      })
    );
  }

  // Utilise le nom ou l'ID pour construire l'URL de l'API et récupérer les détails du Pokémon
  getPokemonSpeciesByNameOrId(nameOrId: string | number): Observable<PokemonSpecies> {
    return this.httpClient.get<IPokemonSpecies>(`${this.apiUrlPokemonSpecies}/${nameOrId}`).pipe(
      map(data => PokemonSpeciesMapper.mapData(data))
    );
  }
}
