import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { ErrorService } from '../error/error.service';
import { EvolutionChain } from 'src/app/models/evolution/evolution-chain';
import { IPokemonSpecies } from 'src/app/interfaces/pokemon-species/pokemon-species';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { IEvolutionChain } from 'src/app/interfaces/evolution/evolution-chains';

@Injectable({
  providedIn: 'root'
})
export class EvolutionChainsService {

  constructor(
    private httpClient    : HttpClient,
    private loggerService : LoggerService, 
    private errorService  : ErrorService,
  ) { }

  getEvolutionChains(urlSpecies: string): Observable<EvolutionChain> {

    return this.httpClient.get<IPokemonSpecies>(urlSpecies).pipe(

      switchMap(responseSpecies => {
        const urlEvolutionChain = responseSpecies.evolution_chain.url;
        return this.httpClient.get<IEvolutionChain>(urlEvolutionChain);
      }),

      map(evolutionChainData => {
        return new EvolutionChain(evolutionChainData);
      }),

      catchError(error => {
        this.loggerService.error("[EvolutionChainsService - getEvolutionChains] error : ", error);
        return this.errorService.handleEvolutionChainError(error);
      })
    );
  }
}