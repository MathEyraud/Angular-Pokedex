import { Component, Input } from '@angular/core';
import { capitalizeFirstLetter } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-pokemon-type',
  templateUrl: './pokemon-type.component.html',
  styleUrls: ['./pokemon-type.component.css']
})
export class PokemonTypeComponent {

  @Input() type: string | null | undefined; // Type du Pokemon
  @Input() showBorder: boolean = false;     // Gérer l'affichage de la bordure


  getFormattedType() : string {
    return this.type ? capitalizeFirstLetter(this.type) : '';  
  }

  // Fonction pour obtenir la classe de type
  getTypeClass(type: string | null | undefined) : string {
    return `type-${type?.toLowerCase()}`;
  }
}
