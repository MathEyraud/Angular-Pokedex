import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { LoggerService } from 'src/app/services/logger/logger.service';

@Component({
  selector: 'app-pokemon-summary',
  templateUrl: './pokemon-summary.component.html',
  styleUrls: ['./pokemon-summary.component.css']
})
export class PokemonSummaryComponent {

  /**
   * ATTRIBUT
   */
  @Input()
  public pokemon !: Pokemon;

  @Output() 
  selectPokemon = new EventEmitter<number>();

  /**
   * CONSTRUCTEUR
   * @param router 
   */
  constructor(
    private router        : Router,
    private loggerService : LoggerService, 
  ) { }

  /**
   * 
   * @param id 
   */
  navigateToDetails(id : string) : void{
    this.router.navigate(['/details', parseInt(id)]);
  }

  onSelectPokemon(id: number): void {
    this.selectPokemon.emit(id);
  }

  /**
   * AFFICHAGE TYPE POKEMON
   * @param type 
   * @returns 
   * MODIFIER LE CSS EN FONCTION DU TYPE
   */
  getTypeClass(type: string | null | undefined): string {

    if(type===null || type===undefined){return ''}

    switch (type.toLowerCase()) {
      case 'steel':
        return 'type-steel';
      case 'fighting':
        return 'type-fighting';
      case 'dragon':
        return 'type-dragon';
      case 'water':
        return 'type-water';
      case 'electric':
        return 'type-electric';
      case 'fairy':
        return 'type-fairy';
      case 'fire':
        return 'type-fire';
      case 'ice':
        return 'type-ice';
      case 'bug':
        return 'type-bug';
      case 'normal':
        return 'type-normal';
      case 'grass':
        return 'type-grass';
      case 'poison':
        return 'type-poison';
      case 'rock':
        return 'type-rock';
      case 'ground':
        return 'type-ground';
      case 'ghost':
        return 'type-ghost';
      case 'dark':
        return 'type-dark';
      case 'flying':
        return 'type-flying';
        case 'psychic':
          return 'type-flying';
      default:
        return '';
    }
  }
}