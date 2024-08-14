import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  // CONSTRUCTEUR
  constructor(private loggerService: LoggerService) {}

  // GESTION DES ERREURS
  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur est survenue';

    // Erreur côté client
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;

    // Erreur côté serveur
    } else {
      errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
    }

    this.loggerService.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // GESTION DES ERREURS LIEE AUX POKEMONS
  handlePokemonError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = 'Erreur lors de la récupération des données Pokémon';
    this.loggerService.error(errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }

  // GESTION DES ERREURS LIEE AUX ATTAQUES
  handleMoveError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = 'Erreur lors de la récupération des données des attaques';
    this.loggerService.error(errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }

  handleEvolutionChainError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = "Erreur lors de la récupération de la chaîne d'évolution";
    this.loggerService.error(errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }

}
