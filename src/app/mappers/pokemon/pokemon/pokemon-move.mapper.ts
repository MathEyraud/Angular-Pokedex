import { IPokemonMove, IPokemonMoveVersion } from "../../../interfaces/pokemon/pokemon-move";
import { PokemonMove, PokemonMoveVersion } from "../../../models/pokemon/pokemon/pokemon-move";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";

export class PokemonMoveMapper {

    static mapPokemonMove(data: IPokemonMove): PokemonMove {
  
      return new PokemonMove(
        ApiRessourceMapper.mapToNamedAPIResource(data.move),
        PokemonMoveMapper.mapVersionsGroupDetail(data.version_group_details),
      );
    }

    static mapPokemonMoves(data: IPokemonMove[]): PokemonMove[] {
        return data.map(PokemonMoveMapper.mapPokemonMove);
    }

    static mapVersionGroupDetail(versionGroupDetail: IPokemonMoveVersion): PokemonMoveVersion {
        return new PokemonMoveVersion(
            versionGroupDetail.level_learned_at,
            ApiRessourceMapper.mapToNamedAPIResource(versionGroupDetail.move_learn_method),
            ApiRessourceMapper.mapToNamedAPIResource(versionGroupDetail.version_group),
        )
    }

    static mapVersionsGroupDetail(versionGroupDetails: IPokemonMoveVersion[]): PokemonMoveVersion[] {
        return versionGroupDetails.map(PokemonMoveMapper.mapVersionGroupDetail);
    }
}