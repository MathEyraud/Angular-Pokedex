import { Component } from '@angular/core';
import { PokemonSummaryComponent } from '../pokemon-summary.component';

@Component({
  selector: 'app-pokemon-summary-card',
  templateUrl: './pokemon-summary-card.component.html',
  styleUrls: [
    '../pokemon-summary.component.css',
    './pokemon-summary-card.component.css'
  ]
})
export class PokemonSummaryCardComponent extends PokemonSummaryComponent {

}
