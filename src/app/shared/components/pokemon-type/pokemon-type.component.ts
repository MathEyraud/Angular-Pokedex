import { Component, Input } from '@angular/core';
import { capitalizeFirstLetter } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-pokemon-type',
  templateUrl: './pokemon-type.component.html',
  styleUrls: ['./pokemon-type.component.css']
})
export class PokemonTypeComponent {

  @Input() type: string | null | undefined;   // Type du Pokemon
  @Input() showBorder: boolean = false;       // Gérer l'affichage de la bordure
  @Input() size!: string;                     // Gérer l'affichage du nom du type

  getFormattedType() : string {
    return this.type ? capitalizeFirstLetter(this.type) : '';  
  }

  // Fonction pour obtenir la classe de type
  getTypeClass(type: string | null | undefined) : string {
    return `type-${type?.toLowerCase()}`;
  }

  displayTypeShortName(typeName: string | null | undefined): string {
    switch (typeName) {
        case 'normal':    return 'Norm.';
        case 'fighting':  return 'Fight';
        case 'flying':    return 'Fly';
        case 'poison':    return 'Pois.';
        case 'ground':    return 'Grnd.';
        case 'rock':      return 'Rock';
        case 'bug':       return 'Bug';
        case 'ghost':     return 'Ghost';
        case 'steel':     return 'Steel';
        case 'fire':      return 'Fire';
        case 'water':     return 'Water';
        case 'grass':     return 'Grass';
        case 'electric':  return 'Elec.';
        case 'psychic':   return 'Psy.';
        case 'ice':       return 'Ice';
        case 'dragon':    return 'Drgn.';
        case 'dark':      return 'Dark';
        case 'fairy':     return 'Fairy';
        case 'stellar':   return 'Stel.';
        case 'unknown':   return 'Unk.';
        default:          return '';  // Retourne une Chaîne vide si le type ne correspond à aucun cas
    }
  }

  displayTypeVeryShortName(typeName: string | null | undefined): string {
    switch (typeName) {
        case 'normal':    return 'N.';
        case 'fighting':  return 'F.';
        case 'flying':    return 'F.';
        case 'poison':    return 'P.';
        case 'ground':    return 'G.';
        case 'rock':      return 'R.';
        case 'bug':       return 'B.';
        case 'ghost':     return 'G.';
        case 'steel':     return 'S.';
        case 'fire':      return 'F.';
        case 'water':     return 'W.';
        case 'grass':     return 'G.';
        case 'electric':  return 'E.';
        case 'psychic':   return 'P.';
        case 'ice':       return 'I.';
        case 'dragon':    return 'D.';
        case 'dark':      return 'D.';
        case 'fairy':     return 'F.';
        case 'stellar':   return 'S.';
        case 'unknown':   return 'U.';
        default:          return '';  // Retourne une Chaîne vide si le type ne correspond à aucun cas
    }
  }
}