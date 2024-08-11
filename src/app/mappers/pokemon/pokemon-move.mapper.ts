import { INamedAPIResource } from "../../interfaces/utility/common-models/common-models";
import { IPokemonMove, IPokemonMoveVersion } from "../../interfaces/pokemon/pokemon-move";
import { NamedAPIResource } from "../../models/api-ressource";
import { PokemonMove, PokemonMoveVersion } from "../../models/pokemon/pokemon-move";
import { ApiRessourceMapper } from "../api-ressource.mapper";

export class PokemonMoveMapper {

    static mapToPokemonMove(apiData: IPokemonMove): PokemonMove {
  
      return new PokemonMove(
        ApiRessourceMapper.mapToNamedAPIResource(apiData.move),
        PokemonMoveMapper.mapVersionGroupDetails(apiData.version_group_details),
      );
    }

    static mapMove(data: IPokemonMove): PokemonMove {
        return PokemonMoveMapper.mapToPokemonMove(data);
    }
    
    static mapMoves(datas: IPokemonMove[]): PokemonMove[] {
        return datas.map(PokemonMoveMapper.mapMove);
    }

    static mapVersionGroupDetail(versionGroupDetail: IPokemonMoveVersion): PokemonMoveVersion {
        return new PokemonMoveVersion(
            versionGroupDetail.level_learned_at,
            ApiRessourceMapper.mapToNamedAPIResource(versionGroupDetail.move_learn_method),
            ApiRessourceMapper.mapToNamedAPIResource(versionGroupDetail.version_group),
        )
    }

    static mapVersionGroupDetails(versionGroupDetails: IPokemonMoveVersion[]): PokemonMoveVersion[] {
        return versionGroupDetails.map(PokemonMoveMapper.mapVersionGroupDetail);
    }
}