import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";
import { IPokemonTypePast } from "src/app/interfaces/pokemon/pokemon";
import { PokemonTypePast } from "src/app/models/pokemon/pokemon/pokemon-type-past";
import { PokemonTypeMapper } from "./pokemon-type.mapper";

export class PokemonTypePastMapper {

    static mapPokemonTypePast(data: IPokemonTypePast): PokemonTypePast {
  
      return new PokemonTypePast(
        ApiRessourceMapper.mapToNamedAPIResource(data.generation),
        PokemonTypeMapper.mapPokemonTypes(data.types),
      );
    }

    static mapPokemonTypesPast(data: IPokemonTypePast[]): PokemonTypePast[] {
        return data.map(PokemonTypePastMapper.mapPokemonTypePast);
    }
}