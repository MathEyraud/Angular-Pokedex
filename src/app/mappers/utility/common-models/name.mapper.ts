import { IName } from "src/app/interfaces/utility/common-models/common-models";
import { Name } from "src/app/models/utility/common-models/common-models";
import { ApiRessourceMapper } from "./api-ressource.mapper";

export class NameMapper {

    static mapName(data: IName): Name {
        return new Name(
            data.name,
            ApiRessourceMapper.mapToNamedAPIResource(data.language),
        );
    }

    static mapNames(data: IName[]): Name[] {
        return data.map(NameMapper.mapName);
    }

}