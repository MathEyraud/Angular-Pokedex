import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/shared/services/pokemon/pokemon.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent {

  /**
   * ATTRIBUT
   */
  private routeSub  !: Subscription;
  pokemonId         !: number;
  pokemon           : Pokemon = new Pokemon(); 
  subscriptions     : Subscription[] = [];

  /**
   * CONSTRUCTEUR
   * @param route 
   */
  constructor(
    private route           : ActivatedRoute,
    private router          : Router,
    private pokemonService  : PokemonService,
  ) { }

  /**
   * 
   */
  ngOnInit(): void {

    let id = null;

    this.routeSub = this.route.paramMap.subscribe(params => {

      id = params.get('id');

      if (id !== null) {

        this.pokemonId = +id;
  
      } else {
        // Gérer le cas où l'ID est null, par exemple rediriger ou afficher une erreur
        this.router.navigate(['**']); // Redirection vers la page d'accueil ou une autre page
      }

    });

    const subscription = this.pokemonService.getPokemonDetail(environment.apis.dataPokemon.url + id).subscribe((data) => {
      this.pokemon.id     = data.id;
      this.pokemon.name   = data.name;
      this.pokemon.type1  = data.types[0]?.type.name;
      this.pokemon.type2  = data.types[1]?.type.name;
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe(); // Unsubscribe pour éviter les fuites de mémoire
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}