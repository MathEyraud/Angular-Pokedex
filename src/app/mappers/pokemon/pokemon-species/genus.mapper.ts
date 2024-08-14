import { Genus } from "src/app/models/pokemon/pokemon-species/genus";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";
import { IGenus } from "src/app/interfaces/pokemon-species/pokemon-species";

export class GenusMapper {

    static mapToGenus(data: IGenus): Genus {
        return new Genus(
            data.genus,
            ApiRessourceMapper.mapToNamedAPIResource(data.language)
        );
    }

    static mapToGenuss(data: IGenus[]): Genus[] {
        return data.map(GenusMapper.mapToGenus);
    }
}
