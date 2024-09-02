import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonTypeComponent } from './components/pokemon-type/pokemon-type.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CustomTabsComponent, TabContentDirective } from './components/custom-tabs/custom-tabs.component';

@NgModule({
  declarations: [
    PokemonTypeComponent,
    SpinnerComponent,
    CustomTabsComponent,
    TabContentDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PokemonTypeComponent,
    SpinnerComponent,
    TabContentDirective,
    CustomTabsComponent,
  ]
})
export class SharedModule { }