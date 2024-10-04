import { IAbilityPokemon } from "src/app/interfaces/pokemon/abilities/abilities";
import { AbilityPokemon } from "src/app/models/pokemon/abilities/ability-pokemon";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";

export class AbilityPokemonMapper {

    static toModel(data: IAbilityPokemon): AbilityPokemon {

        return new AbilityPokemon(
            data.is_hidden,
            data.slot,
            ApiRessourceMapper.mapToNamedAPIResource(data.pokemon)
        );
    }

    static toModels(data: IAbilityPokemon[]): AbilityPokemon[] {
        return data.map(AbilityPokemonMapper.toModel);
    }
}