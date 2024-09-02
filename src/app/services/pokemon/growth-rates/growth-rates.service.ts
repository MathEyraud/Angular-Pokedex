import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '../../logger/logger.service';
import { ErrorService } from '../../error/error.service';
import { GrowthRate } from 'src/app/models/pokemon/growth-rates/growth-rate.model';
import { catchError, map, Observable } from 'rxjs';
import { IGrowthRate } from 'src/app/interfaces/pokemon/growth-rates';
import { GrowthRateMapper } from 'src/app/mappers/pokemon/growth-rates/growth-rate.mapper';
import { ApiResponse } from 'src/app/models/utility/common-models/common-models';
import { IApiResponse } from 'src/app/interfaces/utility/common-models/common-models';
import { ApiRessourceMapper } from 'src/app/mappers/utility/common-models/api-ressource.mapper';

@Injectable({
  providedIn: 'root'
})
export class GrowthRatesService {

  constructor(
    private httpClient    : HttpClient,
    private loggerService : LoggerService, 
    private errorService  : ErrorService,
  ) { }

  getGrowthRates(url: string): Observable<ApiResponse> {

    return this.httpClient.get<IApiResponse>(url).pipe(

      map(response => ApiRessourceMapper.mapToAPIResponse(response)),

      catchError(error => {
        this.loggerService.error("[GrowthRatesService - getGrowthRates] error : ", error);
        return this.errorService.handleGrowthRatesServiceError(error);
      })
    );
  }

  getGrowthRate(url: string): Observable<GrowthRate> {

    return this.httpClient.get<IGrowthRate>(url).pipe(

      map(response => GrowthRateMapper.mapData(response)),

      catchError(error => {
        this.loggerService.error("[GrowthRatesService - getGrowthRate] error : ", error);
        return this.errorService.handleGrowthRatesServiceError(error);
      })
    );
  }
}
