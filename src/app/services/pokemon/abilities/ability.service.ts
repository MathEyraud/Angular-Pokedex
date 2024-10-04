import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoggerService } from '../../logger/logger.service';
import { ErrorService } from '../../error/error.service';
import { Ability } from 'src/app/models/pokemon/abilities/ability';
import { IAbility } from 'src/app/interfaces/pokemon/abilities/abilities';
import { catchError, map, Observable } from 'rxjs';
import { AbilityMapper } from 'src/app/mappers/pokemon/abilities/ability.mapper';

@Injectable({
  providedIn: 'root'
})
export class AbilityService {

  // URL de l'API Pokémon des abilities
  private apiUrl = environment.apis.dataAbilities.url;  

  constructor(
    private http: HttpClient,
    private loggerService : LoggerService, 
    private errorService  : ErrorService,
  ) { }

  getAbilityDetails(url : string): Observable<Ability[]> {

    return this.http.get<IAbility>(url).pipe(

      map(response => AbilityMapper.toModels([response])),

      catchError(error => {
        this.loggerService.error("[AbilityService - getAbilityDetails] error : ", error);
            return this.errorService.handleError(error);
          }
      )
    );
  }

  getAbilityDetailsById(id: number): Observable<Ability[]> {

    return this.http.get<IAbility>(`${this.apiUrl}/${id}`).pipe(

        map(response => AbilityMapper.toModels([response])),

        catchError(error => {
          this.loggerService.error("[AbilityService - getAbilityDetailsById] error : ", error);
              return this.errorService.handleError(error);
            }
        )
      );

  }

}
