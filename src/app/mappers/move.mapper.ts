import { IMove } from "../interfaces/pokemon-api-reponse-detail";
import { MovePokemon, VersionGroupDetail } from "../models/move-pokemon";

export class MoveMapper {

  static getMove(data: IMove): MovePokemon {

    return new MovePokemon(
        data.move.name,
        data.move.url,
        MoveMapper.mapVersionGroupDetails(data.version_group_details)
    );
  }

  static getMoves(data: IMove[]): MovePokemon[] {
    return data.map(MoveMapper.getMove);
  }

  private static mapVersionGroupDetails(details: any[]): VersionGroupDetail[] {

    return details.map(detail => new VersionGroupDetail(
      detail.level_learned_at,
      detail.move_learn_method.name,
      detail.move_learn_method.url,
      detail.version_group.name,
      detail.version_group.url
    ));
  }
}