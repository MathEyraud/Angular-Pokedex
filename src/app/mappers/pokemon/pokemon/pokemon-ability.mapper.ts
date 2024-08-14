import { IPokemonAbility } from "../../../interfaces/pokemon/pokemon";
import { PokemonAbility } from "../../../models/pokemon/pokemon/pokemon-ability";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";


export class PokemonAbilityMapper {

  static mapAbility(data: IPokemonAbility): PokemonAbility {

    return new PokemonAbility(
      data.is_hidden,
      data.slot,
      ApiRessourceMapper.mapToNamedAPIResource(data.ability),
    );
  }

  static mapAbilities(data: IPokemonAbility[]): PokemonAbility[] {
    return data.map(PokemonAbilityMapper.mapAbility);
  }
}