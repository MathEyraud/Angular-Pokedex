import { IPokemonStat } from "../../interfaces/pokemon/pokemon";
import { PokemonStat } from "../../models/pokemon/pokemon-stat";

export class PokemonStatMapper {

  static getStat(detail: IPokemonStat): PokemonStat {

    return new PokemonStat(
      detail.base_stat,
      detail.effort,
      detail.stat.name,
      detail.stat.url
    );
  }

  static getStats(details: IPokemonStat[]): PokemonStat[] {
    return details.map(PokemonStatMapper.getStat);
  }
}