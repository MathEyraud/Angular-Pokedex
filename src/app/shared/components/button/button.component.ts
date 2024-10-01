import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() label        : string = '';
  @Input() disabled     : boolean = false;
  @Input() active       : boolean = false;
  @Input() type         : 'button' | 'submit' | 'reset' = 'button';
  @Input() customClass  : string = '';
  @Input() iconClass    : string = ''; // Pour ajouter une icône si nécessaire

  @Output() buttonClick = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }

}