import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu-general',
  templateUrl: './menu-general.component.html',
  styleUrls: ['./menu-general.component.css']
})
export class MenuGeneralComponent {

  @ViewChild('inputSearch')
  inputSearch! : ElementRef;

  @Output()
  searchEvent = new EventEmitter<string>();

  public search() : void{
    const searchValue = this.inputSearch.nativeElement.value;
    this.searchEvent.emit(searchValue);
  }

}