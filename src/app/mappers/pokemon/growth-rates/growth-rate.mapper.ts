import { IGrowthRate } from "src/app/interfaces/pokemon/growth-rates";
import { GrowthRate } from "src/app/models/pokemon/growth-rates/growth-rate.model";
import { DescriptionMapper } from "../../utility/common-models/description.mapper";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";
import { GrowthRateExperienceLevelMapper } from "./growth-rate-experience-level.mapper";

export class GrowthRateMapper  {
  
    static mapData(data: IGrowthRate): GrowthRate {

        return new GrowthRate(
            data.id,
            data.name,
            data.formula,
            DescriptionMapper.mapToDescriptions(data.descriptions),
            GrowthRateExperienceLevelMapper.mapDatas(data.levels),
            ApiRessourceMapper.mapToNamedAPIResources(data.pokemon_species),
        )
    }
}