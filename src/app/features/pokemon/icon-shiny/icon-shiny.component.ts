import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-shiny',
  templateUrl: './icon-shiny.component.html',
  styleUrls: ['./icon-shiny.component.css']
})
export class IconShinyComponent {

  @Input() width  : number = 10;
  @Input() height : number = 10;

  @Input() isLegendary  : boolean = false;
  @Input() isMythical   : boolean = false;

  // Getter to compute the color dynamically
  get color(): string {
    if (this.isLegendary) {return 'var(--color-badge-legendary)';}
    if (this.isMythical) {return 'var(--color-badge-mythical)';}
    return 'black'; // Default color
  }

}
