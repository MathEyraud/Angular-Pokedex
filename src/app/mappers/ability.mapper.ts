import { IAbility } from "../interfaces/pokemon-api-reponse-detail";
import { AbilityPokemon } from "../models/ability-pokemon";

export class AbilityMapper {

  static getAbility(data: IAbility): AbilityPokemon {

    return new AbilityPokemon(
      data.ability.name,
      data.ability.url,
      data.is_hidden,
      data.slot
    );
  }

  static getAbilities(data: IAbility[]): AbilityPokemon[] {
    return data.map(AbilityMapper.getAbility);
  }
}