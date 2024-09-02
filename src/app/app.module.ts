import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuGeneralComponent } from './shared/components/menu-general/menu-general.component';
import { PokemonModule } from './features/pokemon/pokemon.module';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { MovesModule } from './features/moves/moves.module';



@NgModule({
  declarations: [
    AppComponent,
    MenuGeneralComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PokemonModule,    // Important à mettre avant AppRoutingModule : Pour le chargement
    MovesModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }