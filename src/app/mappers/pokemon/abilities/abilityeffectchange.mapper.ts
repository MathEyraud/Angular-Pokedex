import { IAbilityEffectChange } from "src/app/interfaces/pokemon/abilities/abilities";
import { AbilityEffectChange } from "src/app/models/pokemon/abilities/ability-effect-change";
import { EffectMapper } from "../../utility/common-models/effect.mapper";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";

export class AbilityEffectChangeMapper {

    static toModel(data: IAbilityEffectChange): AbilityEffectChange {

        return new AbilityEffectChange(
            EffectMapper.mapEffects(data.effect_entries),
            ApiRessourceMapper.mapToNamedAPIResource(data.version_group)
        );
    }

    static toModels(data: IAbilityEffectChange[]): AbilityEffectChange[] {
        return data.map(AbilityEffectChangeMapper.toModel);
    }
}