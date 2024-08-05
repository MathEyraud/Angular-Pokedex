import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Moves } from 'src/app/models/moves/moves';

@Injectable({
  providedIn: 'root'
})
export class MovePaginationService {
  private data          = new BehaviorSubject<Moves[]>([]); // BehaviorSubject pour stocker et émettre la liste des attaques
  private totalData     = new BehaviorSubject<number>(0);   // BehaviorSubject pour stocker et émettre le nombre total d'attaques
  private offsetSource  = new BehaviorSubject<number>(0);   // BehaviorSubject pour stocker et émettre la valeur actuelle de l'offset (déplacement de la pagination)

  data$       = this.data.asObservable();         // Observable pour suivre la liste des attaques
  totalData$  = this.totalData.asObservable();    // Observable pour suivre le nombre total d'attaques
  offset$     = this.offsetSource.asObservable(); // Observable pour suivre la valeur actuelle de l'offset

  /**
   * Met à jour la liste des attaques.
   * @param data La nouvelle liste des attaques.
   */
  setData(data: Moves[]): void {
    this.data.next(data);
  }

  /**
   * Met à jour le nombre total d'attaques.
   * @param total Le nouveau nombre total d'attaques.
   */
  setTotalData(total: number): void {
    this.totalData.next(total);
  }

  /**
   * Met à jour la valeur de l'offset pour la pagination.
   * @param offset La nouvelle valeur de l'offset.
   */
  setOffset(offset: number): void {
    this.offsetSource.next(offset);
  }

}
