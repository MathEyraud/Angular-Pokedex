import { Component, Input, SimpleChanges } from '@angular/core';
import { PokemonSummaryComponent } from '../pokemon-summary.component';

@Component({
  selector: 'app-pokemon-summary-tile',
  templateUrl: './pokemon-summary-tile.component.html',
  styleUrls: [
    '../pokemon-summary.component.css',
    './pokemon-summary-tile.component.css'
  ]
})
export class PokemonSummaryTileComponent extends PokemonSummaryComponent {

  // Entrée pour indiquer si le Pokémon est sélectionné
  @Input() isSelected: boolean = false; 

}
