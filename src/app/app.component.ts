import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title       :string = 'pokedex';
  subTitle    :string = 'subTitle';
  searchValue :string = '';

  handleSearch(searchValue : string) : void{
    this.searchValue = searchValue;
  }
}