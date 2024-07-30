import { IStat } from "../interfaces/pokemon-api-reponse-detail";
import { StatPokemon } from "../models/stat-pokemon";

export class StatMapper {

  static getStat(detail: IStat): StatPokemon {

    return new StatPokemon(
      detail.base_stat,
      detail.effort,
      detail.stat.name,
      detail.stat.url
    );
  }

  static getStats(details: IStat[]): StatPokemon[] {
    return details.map(StatMapper.getStat);
  }
}