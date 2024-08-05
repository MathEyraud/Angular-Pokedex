import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { ErrorService } from '../error/error.service';
import { environment } from 'src/environments/environment';
import { IMoveApiResponse, IMoves } from 'src/app/interfaces/moves';
import { catchError, forkJoin, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { Moves } from 'src/app/models/moves/moves';
import { MoveMapper } from 'src/app/mappers/move.mapper';

@Injectable({
  providedIn: 'root'
})
export class MoveService {

  /**
   * ATTRIBUT
  */
  private apiUrl = environment.apis.dataMoves.url;  // URL de l'API des données

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
  getData(limit: number, offset: number): Observable<{ results: Moves[], total: number }> {

    // Création des paramètres de requête pour la pagination
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    // Appel à l'API et traitement de la réponse
    return this.httpClient.get<IMoveApiResponse>(this.apiUrl, { params }).pipe(

      switchMap(response => this.mapApiResponse(response)),
      catchError(error => this.errorService.handleMoveError(error))
    );
  }

  /**
   * Traite la réponse de l'API
   * @param response Réponse de l'API
   * @returns Observable avec les data détaillés et le nombre total
   */
  private mapApiResponse(response: IMoveApiResponse): Observable<{ results: Moves[], total: number }> {

    return this.getDetails(response.results).pipe(
      map(moves => ({ results: moves, total: response.count }))
    );
  }

  /**
   * Récupère les détails de chaque donnée
   * @param dataList Liste des data avec leurs URLs
   * @returns Observable avec un tableau des données détaillés
   */
  private getDetails(dataList: Array<{ url: string }>): Observable<Moves[]> {

    // Mapping de chaque URL pour récupérer ses détails
    const detailRequests$ = dataList.map(data => {

      return this.getDetail(data.url).pipe(

        map(detailJSON => detailJSON ? detailJSON : null) // Récupère le détail ou retourne null

      );
    });

    // Utilisation de forkJoin pour attendre que toutes les requêtes soient complétées
    return forkJoin(detailRequests$).pipe(

      // Filtre les détails pour éliminer les valeurs null
      map(details => details.filter(detail => detail !== null) as Moves[])

    );
  }


  /**
   * Récupère les détails spécifique d'une data
   * @param url URL de l'API pour les détails
   * @returns Observable avec les détails
  */
    getDetail(url: string): Observable<Moves | null> {

      return this.httpClient.get<IMoves>(url).pipe(
  
        map(response => {
  
          // On vérifie que la réponse retourné
          if (!response || Object.keys(response).length === 0) {
            return null;
          }
  
          return MoveMapper.mapToMoves(response);
        }),
  
        catchError(error => {
          this.errorService.handleMoveError(error);
          return of(null); // Retourne un observable null en cas d'erreur
        })
        
      );
    }
}
