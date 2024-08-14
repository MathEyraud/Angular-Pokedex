import { Effect } from "src/app/models/utility/common-models/common-models";
import { IEffect } from "src/app/interfaces/utility/common-models/common-models";
import { ApiRessourceMapper } from "./api-ressource.mapper";

export class EffectMapper {

    static mapEffect(data: IEffect): Effect {
        return new Effect(
            data.effect,
            ApiRessourceMapper.mapToNamedAPIResource(data.language),
        );
    }

    static mapEffects(data: IEffect[]): Effect[] {
        return data.map(EffectMapper.mapEffect);
    }

}