import { IPalParkEncounterArea } from "src/app/interfaces/pokemon-species/pokemon-species";
import { PalParkEncounterArea } from "src/app/models/pokemon/pokemon-species/pal-park-encounter-area";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";

export class PalParkEncounterAreaMapper {

    static mapToPalParkEncounterArea(data: IPalParkEncounterArea): PalParkEncounterArea {
        return new PalParkEncounterArea(
            data.base_score,
            data.rate,
            ApiRessourceMapper.mapToNamedAPIResource(data.area)
        );
    }

    static mapToPalParkEncounterAreas(data: IPalParkEncounterArea[]): PalParkEncounterArea[] {
        return data.map(PalParkEncounterAreaMapper.mapToPalParkEncounterArea);
    }
}