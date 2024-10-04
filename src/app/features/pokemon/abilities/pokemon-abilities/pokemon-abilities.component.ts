import { Component, Input } from '@angular/core';
import { Ability } from 'src/app/models/pokemon/abilities/ability';

export interface PokemonAbilityDetail {
  ability: Ability;
  isHidden: boolean;
}

@Component({
  selector: 'app-pokemon-abilities',
  templateUrl: './pokemon-abilities.component.html',
  styleUrls: ['./pokemon-abilities.component.css']
})
export class PokemonAbilitiesComponent {

  @Input() abilities: PokemonAbilityDetail[] = [];

  ngOnInit(){
    console.log("abilities :", this.abilities);
  }

  // Récupère uniquement les objets Ability des capacités visibles
  get visibleAbilities(): Ability[] {
    return this.abilities
      .filter(abilityDetail => !abilityDetail.isHidden)
      .map(abilityDetail => abilityDetail.ability);
  }

  // Récupère uniquement l'objet Ability de la capacité cachée, s'il existe
  get hiddenAbility(): Ability | null {
    const hiddenAbilityDetail = this.abilities.find(abilityDetail => abilityDetail.isHidden);
    return hiddenAbilityDetail ? hiddenAbilityDetail.ability : null;
  }

}