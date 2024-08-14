import { IPokemonCries } from "src/app/interfaces/pokemon/pokemon";
import { PokemonCries } from "src/app/models/pokemon/pokemon/pokemon-cries";

export class PokemonCriesMapper {
  
    static mapPokemonCries(data: IPokemonCries): PokemonCries {

        return new PokemonCries(
            data.latest,
            data.legacy,
        )
    }
}