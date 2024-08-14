import { IFlavorText } from "src/app/interfaces/utility/common-models/common-models";
import { FlavorText } from "src/app/models/utility/common-models/common-models";
import { ApiRessourceMapper } from "./api-ressource.mapper";

export class FlavorTextMapper {

    static mapToFlavorText(data: IFlavorText): FlavorText {
        return new FlavorText(
            data.flavor_text,
            ApiRessourceMapper.mapToNamedAPIResource(data.language),
            ApiRessourceMapper.mapToNamedAPIResource(data.version)
        );
    }

    static mapToFlavorsText(data: IFlavorText[]): FlavorText[] {
        return data.map(FlavorTextMapper.mapToFlavorText);
    }
}
