import { IAbilityFlavorText } from "src/app/interfaces/pokemon/abilities/abilities";
import { AbilityFlavorText } from "src/app/models/pokemon/abilities/ability-flavor-text";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";

export class AbilityFlavorTextMapper {

    static toModel(data: IAbilityFlavorText): AbilityFlavorText {

        return new AbilityFlavorText(
            data.flavor_text,
            ApiRessourceMapper.mapToNamedAPIResource(data.language),
            ApiRessourceMapper.mapToNamedAPIResource(data.version_group)
        );
    }

    static toModels(data: IAbilityFlavorText[]): AbilityFlavorText[] {
        return data.map(AbilityFlavorTextMapper.toModel);
    }
}