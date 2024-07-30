import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonPaginationService {

  private pokemonsSource      = new BehaviorSubject<Pokemon[]>([]); // BehaviorSubject pour stocker et émettre la liste des Pokémons
  private totalPokemonsSource = new BehaviorSubject<number>(0);     // BehaviorSubject pour stocker et émettre le nombre total de Pokémons
  private offsetSource        = new BehaviorSubject<number>(0);     // BehaviorSubject pour stocker et émettre la valeur actuelle de l'offset (déplacement de la pagination)

  pokemons$       = this.pokemonsSource.asObservable();       // Observable pour suivre la liste des Pokémons
  totalPokemons$  = this.totalPokemonsSource.asObservable();  // Observable pour suivre le nombre total de Pokémons
  offset$         = this.offsetSource.asObservable();         // Observable pour suivre la valeur actuelle de l'offset

  /**
   * Met à jour la liste des Pokémons.
   * @param pokemons La nouvelle liste de Pokémons.
   */
  setPokemons(pokemons: Pokemon[]): void {
    this.pokemonsSource.next(pokemons);
  }

  /**
   * Met à jour le nombre total de Pokémons.
   * @param total Le nouveau nombre total de Pokémons.
   */
  setTotalPokemons(total: number): void {
    this.totalPokemonsSource.next(total);
  }

  /**
   * Met à jour la valeur de l'offset pour la pagination.
   * @param offset La nouvelle valeur de l'offset.
   */
  setOffset(offset: number): void {
    this.offsetSource.next(offset);
  }
}