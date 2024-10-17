import { Component, Input, SimpleChanges } from '@angular/core';
import { PokemonSummaryComponent } from '../pokemon-summary.component';
import { Subscription } from 'rxjs';
import { PokemonTypeSizeService } from 'src/app/services/pokemon/types/pokemon-type-size.service';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger/logger.service';

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

  typeSize: 'normal' | 'short' | 'veryShort' = 'normal';
  private subscription: Subscription | null = null;

  constructor(
    protected typeSizeService         : PokemonTypeSizeService,
    protected override router         : Router,
    protected override loggerService  : LoggerService,
  ) {
    super(router, loggerService);
  }

  ngOnInit() {
    this.subscription = this.typeSizeService.typeSize$.subscribe(size => {
      this.typeSize = size;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
