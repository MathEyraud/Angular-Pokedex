import { IGenerationGameIndex } from "src/app/interfaces/utility/common-models/common-models";
import { GenerationGameIndex } from "src/app/models/utility/common-models/generation-game-index";
import { ApiRessourceMapper } from "./api-ressource.mapper";

export class GenerationGameIndexMapper {

    static mapData(data: IGenerationGameIndex): GenerationGameIndex {

        return new GenerationGameIndex(
            data.game_index,
            ApiRessourceMapper.mapToNamedAPIResource(data.generation)
        );

    }
  
    static mapDatas(data: IGenerationGameIndex[]): GenerationGameIndex[] {
        return data.map(item => this.mapData(item));
    }
}