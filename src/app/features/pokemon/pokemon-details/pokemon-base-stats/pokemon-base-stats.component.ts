import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-base-stats',
  templateUrl: './pokemon-base-stats.component.html',
  styleUrls: ['./pokemon-base-stats.component.css']
})
export class PokemonBaseStatsComponent {

  @Input() title : string = "";
  @Input() value : number = 0;

  displayFullStatName(title: string): string {
    switch (title) {
      case 'hp':
        return 'HP';
      case 'attack':
        return 'Attack';
      case 'defense':
        return 'Defense';
      case 'special-attack':
        return 'Special Attack';
      case 'special-defense':
        return 'Special Defense';
      case 'speed':
        return 'Speed';
      default:
        return '';  // Retourne une chaîne vide si l'attribut ne correspond à aucun cas
    }
  }

  displayShortStatName(title: string): string {
    switch (title) {
      case 'hp':
        return 'HP';
      case 'attack':
        return 'Att.';
      case 'defense':
        return 'Def.';
      case 'special-attack':
        return 'Spe. Att.';
      case 'special-defense':
        return 'Spe. Def.';
      case 'speed':
        return 'Speed';
      default:
        return '';  // Retourne une chaîne vide si l'attribut ne correspond à aucun cas
    }
  }
  

  // Method to determine the progress bar color class
  getProgressBarClass(value: number): string {

    const percentage = (value / 255) * 100;

    if (percentage < 20) {
      return 'low';

    } else if (percentage >= 20 && percentage < 40) {
      return 'medium-low';

    } else if (percentage >= 40 && percentage < 60) {
      return 'medium-hight';

    } else {
      return 'high';
    }
  }

}
