import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovesComponent } from './moves/moves.component';
import { MovesRoutingModule } from './moves-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DamageClassComponent } from './damage-class/damage-class.component';

@NgModule({
  declarations: [
    MovesComponent,
    DamageClassComponent,
  ],
  imports: [
    CommonModule,
    MovesRoutingModule,
    SharedModule,
  ],
  exports: []
})
export class MovesModule { }