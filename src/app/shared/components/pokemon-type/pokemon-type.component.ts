import { Component, Input } from '@angular/core';
import { capitalizeFirstLetter } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-pokemon-type',
  templateUrl: './pokemon-type.component.html',
  styleUrls: ['./pokemon-type.component.css']
})
export class PokemonTypeComponent {

  @Input() type: string | null | undefined;

  getFormattedType() : string {
    return this.type ? capitalizeFirstLetter(this.type) : '';  
  }

  getTypeClass(type: string | null | undefined) : string {

    if(type === null || type === undefined) {return ''}

    switch (type.toLowerCase()) {
      case 'steel'      : return 'type-steel';
      case 'fighting'   : return 'type-fighting';
      case 'dragon'     : return 'type-dragon';
      case 'water'      : return 'type-water';
      case 'electric'   : return 'type-electric';
      case 'fairy'      : return 'type-fairy';
      case 'fire'       : return 'type-fire';
      case 'ice'        : return 'type-ice';
      case 'bug'        : return 'type-bug';
      case 'normal'     : return 'type-normal';
      case 'grass'      : return 'type-grass';
      case 'poison'     : return 'type-poison';
      case 'rock'       : return 'type-rock';
      case 'ground'     : return 'type-ground';
      case 'ghost'      : return 'type-ghost';
      case 'dark'       : return 'type-dark';
      case 'flying'     : return 'type-flying';
      case 'psychic'    : return 'type-psychic';
      default: return '';
    }
  }
}
