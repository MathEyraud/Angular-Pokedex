import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.css']
})
export class InfoSectionComponent {

  @Input() title : string | null = "";
  @Input() text : string  | null = "";
}
