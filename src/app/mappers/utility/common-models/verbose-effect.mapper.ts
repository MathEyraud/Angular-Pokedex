import { IVerboseEffect } from "src/app/interfaces/utility/common-models/common-models";
import { VerboseEffect } from "src/app/models/utility/common-models/common-models";
import { ApiRessourceMapper } from "./api-ressource.mapper";

export class VerboseEffectMapper {

    static toModel(data: IVerboseEffect): VerboseEffect {

        return new VerboseEffect(
            data.effect,
            data.short_effect,
            ApiRessourceMapper.mapToNamedAPIResource(data.language),
        );
    }

    static toModels(data: IVerboseEffect[]): VerboseEffect[] {
        return data.map(VerboseEffectMapper.toModel);
    }
}