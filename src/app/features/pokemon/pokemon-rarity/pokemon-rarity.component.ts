import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pokemon-rarity',
  templateUrl: './pokemon-rarity.component.html',
  styleUrls: ['./pokemon-rarity.component.css']
})
export class PokemonRarityComponent implements OnInit, OnChanges {

  @Input() title : string = '';

  rarityClass: string = '';
  rarityLabel: string = '';

  ngOnInit(): void {
    this.updateRarityInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title']) {this.updateRarityInfo()}
  }

  private updateRarityInfo(): void {

    switch (this.title.toLowerCase()) {

      case 'baby':
        this.rarityClass = 'container-border-baby';
        this.rarityLabel = 'Baby';
        break;

      case 'legendary':
        this.rarityClass = 'gradient-border-legendary';
        this.rarityLabel = 'Legendary';
        break;

      case 'mythical':
        this.rarityClass = 'gradient-border-mythical';
        this.rarityLabel = 'Mythical';
        break;

      case 'mega':
        this.rarityClass = 'container-border-mega';
        this.rarityLabel = 'Mega';
        break;

      case 'gmax':
        this.rarityClass = 'container-border-gmax';
        this.rarityLabel = 'Gmax';
        break;
      
      case 'hidden-ability':
        this.rarityClass = 'gradient-border-mythical';
        this.rarityLabel = 'Hidden ability';
        break;

      default:
        this.rarityClass = 'container-border-default';
        this.rarityLabel = 'Default';
    }
  }
}
