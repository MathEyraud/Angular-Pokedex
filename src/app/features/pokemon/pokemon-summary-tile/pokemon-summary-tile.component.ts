import { Component } from '@angular/core';
import { PokemonSummaryComponent } from '../pokemon-summary/pokemon-summary.component';

@Component({
  selector: 'app-pokemon-summary-tile',
  templateUrl: './pokemon-summary-tile.component.html',
  styleUrls: [
    '../pokemon-summary/pokemon-summary.component.css',
    './pokemon-summary-tile.component.css'
  ]
})
export class PokemonSummaryTileComponent extends PokemonSummaryComponent {

}
