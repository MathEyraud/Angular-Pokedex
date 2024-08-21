import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [

  // Page de la liste des pokemons
  { path: '', pathMatch:'full', redirectTo: '/pokemon',},
  
  // Route pour la page non trouvée
  { path: '**', component: PageNotFoundComponent },

  // Route pour la page non trouvée
  { path: 'NotFound', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
