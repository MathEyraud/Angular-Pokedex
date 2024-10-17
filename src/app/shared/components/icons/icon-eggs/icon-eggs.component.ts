import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-eggs',
  templateUrl: './icon-eggs.component.html',
  styleUrls: ['./icon-eggs.component.css']
})
export class IconEggsComponent {

  @Input() width  : number = 12;
  @Input() height : number = 11;

  @Input() isBaby  : boolean = false;
  
  // Getter to compute the color dynamically
  get color(): string {
    if (this.isBaby) {return 'var(--color-badge-baby)';}
    return 'black'; // Default color
  }

}
