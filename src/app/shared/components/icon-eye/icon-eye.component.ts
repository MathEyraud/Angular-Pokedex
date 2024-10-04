import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-eye',
  templateUrl: './icon-eye.component.html',
  styleUrls: ['./icon-eye.component.css']
})
export class IconEyeComponent {

  @Input() width  : number = 12;
  @Input() height : number = 13;

  @Input() isHiddenAbility  : boolean = false;

  // Getter to compute the color dynamically
  get color(): string {
    if (this.isHiddenAbility) {return 'var(--color-badge-mythical)';}
    return 'black'; // Default color
  }

}
