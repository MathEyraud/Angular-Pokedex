import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonColorService {

  private colorMap!: { [key: string]: string };

  constructor() {
    this.initializeColorMap();
  }

  private initializeColorMap(): void {

    const styles = getComputedStyle(document.documentElement);

    this.colorMap = {
      black   : styles.getPropertyValue('--color-type-dark').trim(),
      blue    : styles.getPropertyValue('--color-type-water').trim(),
      brown   : styles.getPropertyValue('--color-type-ground').trim(),
      gray    : styles.getPropertyValue('--color-type-rock').trim(),
      green   : styles.getPropertyValue('--color-type-grass').trim(),
      pink    : styles.getPropertyValue('--color-type-fairy').trim(),
      purple  : styles.getPropertyValue('--color-type-poison').trim(),
      red     : styles.getPropertyValue('--color-type-fire').trim(),
      white   : styles.getPropertyValue('--color-type-normal').trim(),
      yellow  : styles.getPropertyValue('--color-type-electric').trim()
    };
  }

  getColor(colorName: string, opacity: string = '20'): string {

    const color = this.colorMap[colorName.toLowerCase()] || colorName;

    return `${color}${opacity}`;
  }

}
