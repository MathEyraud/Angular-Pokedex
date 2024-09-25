import { IPokemonFormSprites } from "src/app/interfaces/pokemon/PokemonForm";
import { PokemonFormSprites } from "src/app/models/pokemon/pokemon-forms/pokemon-form-sprites";

export class PokemonFormSpritesMapper {

    static toModel(data: IPokemonFormSprites): PokemonFormSprites {

        return new PokemonFormSprites(
            data.front_default,
            data.front_shiny,
            data.back_default,
            data.back_shiny
        );
        
    }

}