import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { IPokemonForm } from 'src/app/interfaces/pokemon/PokemonForm';
import { PokemonFormMapper } from 'src/app/mappers/pokemon/pokemon-forms/pokemon-form.mapper';
import { PokemonForm } from 'src/app/models/pokemon/pokemon-forms/pokemon-form';
import { environment } from 'src/environments/environment';
import { LoggerService } from '../../logger/logger.service';
import { ErrorService } from '../../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonFormsService {

  // URL de l'API Pokémon des species
  private apiUrlPokemonForms = environment.apis.dataForms.url;  

  constructor(
    private http: HttpClient,
    private loggerService : LoggerService, 
    private errorService  : ErrorService,
  ) { }

  getPokemonForms(urlForms : string): Observable<PokemonForm[]> {

    return this.http.get<IPokemonForm>(urlForms).pipe(

      map(response => PokemonFormMapper.toModels([response])),

      catchError(error => {
        this.loggerService.error("[PokemonFormsService - getPokemonForms] error : ", error);
        return this.errorService.handleError(error);
      })
    );
  }

  getPokemonFormsById(pokemonId: number): Observable<PokemonForm[]> {

    return this.http.get<IPokemonForm>(`${this.apiUrlPokemonForms}/${pokemonId}`)

      .pipe(
        map(response => PokemonFormMapper.toModels([response]))
      );

  }
}
