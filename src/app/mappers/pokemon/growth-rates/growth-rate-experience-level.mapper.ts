import { IGrowthRateExperienceLevel } from "src/app/interfaces/pokemon/growth-rates";
import { GrowthRateExperienceLevel } from "src/app/models/pokemon/growth-rates/growth-rate-experience-level.model";

export class GrowthRateExperienceLevelMapper  {
  
    static mapData(data: IGrowthRateExperienceLevel): GrowthRateExperienceLevel {

        return new GrowthRateExperienceLevel(
            data.level,
            data.experience,
        )
    }

    static mapDatas(data: IGrowthRateExperienceLevel[]): GrowthRateExperienceLevel[] {
        return data.map(GrowthRateExperienceLevelMapper.mapData);
    }
}