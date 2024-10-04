import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonTypeComponent } from './components/pokemon-type/pokemon-type.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CustomTabsComponent, TabContentDirective } from './components/custom-tabs/custom-tabs.component';
import { ButtonComponent } from './components/button/button.component';
import { TablePokemonMovesComponent } from './components/table-pokemon-moves/table-pokemon-moves.component';
import { DamageClassComponent } from './components/damage-class/damage-class.component';
import { IconEyeComponent } from './components/icon-eye/icon-eye.component';

@NgModule({
  declarations: [
    PokemonTypeComponent,
    SpinnerComponent,
    CustomTabsComponent,
    TabContentDirective,
    ButtonComponent,
    TablePokemonMovesComponent,
    DamageClassComponent,
    IconEyeComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PokemonTypeComponent,
    SpinnerComponent,
    TabContentDirective,
    CustomTabsComponent,
    ButtonComponent,
    TablePokemonMovesComponent,
    DamageClassComponent,
    IconEyeComponent,
  ]
})
export class SharedModule { }