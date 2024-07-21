import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoPokemon } from 'src/app/models/photo-pokemon';

@Component({
  selector: 'app-pokemon-summary',
  templateUrl: './pokemon-summary.component.html',
  styleUrls: ['./pokemon-summary.component.css']
})
export class PokemonSummaryComponent {

  /**
   * ATTRIBUT
   */
  @Input()
  public photoPokemon : PhotoPokemon = {url:'', pokemon:{id:'',name:'',type1:'', type2:'', photos:[]}}

  /**
   * CONSTRUCTEUR
   * @param router 
   */
  constructor(private router: Router) { }

  /**
   * 
   * @param id 
   */
  navigateToDetails(id : string) : void{
    this.router.navigate(['/pokemon', parseInt(id)]);
  }

  /**
   * AFFICHAGE CHIFFRE POKEMON
   * @param id 
   * @returns 
   * PERMET D'AFFICHER LE NUMERO AVEC 4 CHIFFRES
   */
  formatPokemonId(id: string): string {

    if (parseInt(id) < 10) {
      return `000${id}`;

    } else if (parseInt(id) < 100) {
      return `00${id}`;

    } else if (parseInt(id) < 1000) {
      return `0${id}`;

    } else {
      return `${id}`;
    }
  }
  
  /**
   * AFFICHAGE TYPE POKEMON
   * @param type 
   * @returns 
   * MODIFIER LE CSS EN FONCTION DU TYPE
   */
  getTypeClass(type: string): string {
    switch (type.toLowerCase()) {
      case 'steel':
        return 'type-steel';
      case 'fighting':
        return 'type-fighting';
      case 'dragon':
        return 'type-dragon';
      case 'water':
        return 'type-water';
      case 'electric':
        return 'type-electric';
      case 'fairy':
        return 'type-fairy';
      case 'fire':
        return 'type-fire';
      case 'ice':
        return 'type-ice';
      case 'bug':
        return 'type-bug';
      case 'normal':
        return 'type-normal';
      case 'grass':
        return 'type-grass';
      case 'poison':
        return 'type-poison';
      case 'rock':
        return 'type-rock';
      case 'ground':
        return 'type-ground';
      case 'ghost':
        return 'type-ghost';
      case 'dark':
        return 'type-dark';
      case 'flying':
        return 'type-flying';
      // Ajoutez d'autres types ici
      default:
        return '';
    }
  }
}