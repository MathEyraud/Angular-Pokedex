import { IAbility } from "src/app/interfaces/pokemon/abilities/abilities";
import { Ability } from "src/app/models/pokemon/abilities/ability";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";
import { NameMapper } from "../../utility/common-models/name.mapper";
import { VerboseEffectMapper } from "../../utility/common-models/verbose-effect.mapper";
import { AbilityEffectChangeMapper } from "./abilityeffectchange.mapper";
import { AbilityFlavorTextMapper } from "./ability-flavor-text.mapper";
import { AbilityPokemonMapper } from "./ability-pokemon.mapper";

export class AbilityMapper {

    static toModel(data: IAbility): Ability {

        return new Ability(
            data.id,
            data.name,
            data.is_main_series,
            ApiRessourceMapper.mapToNamedAPIResource(data.generation),
            NameMapper.mapNames(data.names),
            VerboseEffectMapper.toModels(data.effect_entries),
            AbilityEffectChangeMapper.toModels(data.effect_changes),
            AbilityFlavorTextMapper.toModels(data.flavor_text_entries),
            AbilityPokemonMapper.toModels(data.pokemon)
        );
    }

    static toModels(data: IAbility[]): Ability[] {
        return data.map(AbilityMapper.toModel);
    }
}
