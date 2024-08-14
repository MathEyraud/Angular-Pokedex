import { IDescription } from "src/app/interfaces/utility/common-models/common-models";
import { Description } from "src/app/models/utility/common-models/common-models";
import { ApiRessourceMapper } from "./api-ressource.mapper";

export class DescriptionMapper {

    static mapToDescription(data: IDescription): Description {
        return new Description(
            data.description,
            ApiRessourceMapper.mapToNamedAPIResource(data.language)
        );
    }

    static mapToDescriptions(data: IDescription[]): Description[] {
        return data.map(DescriptionMapper.mapToDescription);
    }
}
