import { Component, Input } from '@angular/core';
import { capitalizeFirstLetter } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-damage-class',
  templateUrl: './damage-class.component.html',
  styleUrls: ['./damage-class.component.css']
})
export class DamageClassComponent {

  @Input() damageClass: string | null | undefined;

  getFormattedDamageClass() : string {
    return this.damageClass ? capitalizeFirstLetter(this.damageClass) : '';  
  }

  getDamageClass(damageClass: string | null | undefined) : string {

    if(damageClass === null || damageClass === undefined) {return ''}

    switch (damageClass.toLowerCase()) {
      case 'physical' : return 'damage-physical';
      case 'special'  : return 'damage-special';
      case 'status'   : return 'damage-status';
      default: return '';
    }
  }
}
