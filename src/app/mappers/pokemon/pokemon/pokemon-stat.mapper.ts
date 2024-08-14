import { IPokemonStat } from "../../../interfaces/pokemon/pokemon";
import { PokemonStat } from "../../../models/pokemon/pokemon/pokemon-stat";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";

export class PokemonStatMapper {

  static mapPokemonStat(data: IPokemonStat): PokemonStat {

    return new PokemonStat(
      ApiRessourceMapper.mapToNamedAPIResource(data.stat),
      data.effort,
      data.base_stat,
    );
  }

  static mapPokemonStats(data: IPokemonStat[]): PokemonStat[] {
    return data.map(PokemonStatMapper.mapPokemonStat);
  }
}