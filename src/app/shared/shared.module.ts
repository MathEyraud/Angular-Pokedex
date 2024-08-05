import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonTypeComponent } from './components/pokemon-type/pokemon-type.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    PokemonTypeComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PokemonTypeComponent,
    SpinnerComponent,
  ]
})
export class SharedModule { }