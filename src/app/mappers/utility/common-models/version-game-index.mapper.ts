import { IVersionGameIndex } from "src/app/interfaces/utility/common-models/common-models";
import { VersionGameIndex } from "src/app/models/utility/common-models/common-models";
import { ApiRessourceMapper } from "./api-ressource.mapper";

export class VersionGameIndexMapper {

  static mapVersionGameIndex(data: IVersionGameIndex): VersionGameIndex {

    return new VersionGameIndex(
      data.game_index,
      ApiRessourceMapper.mapToNamedAPIResource(data.version),
    );
  }

  static mapVersionsGameIndex(data: IVersionGameIndex[]): VersionGameIndex[] {
    return data.map(VersionGameIndexMapper.mapVersionGameIndex);
  }
}