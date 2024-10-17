import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-mega-stone',
  templateUrl: './icon-mega-stone.component.html',
  styleUrls: ['./icon-mega-stone.component.css']
})
export class IconMegaStoneComponent {

  @Input() width  : number = 24;
  @Input() height : number = 24;

  @Input() isMega  : boolean = false;
  
  // Getter to compute the color dynamically
  get color(): string {
    if (this.isMega) {return 'var(--color-badge-mega)';}
    return 'black'; // Default color
  }
}
