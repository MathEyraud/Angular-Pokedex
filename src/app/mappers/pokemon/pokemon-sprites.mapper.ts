import { IPokemonSprites } from "../../interfaces/pokemon/pokemon-sprites";
import { PokemonSprites } from "../../models/pokemon/pokemon-sprites";

export class PokemonSpritesMapper {

  static getSprites(data: IPokemonSprites): PokemonSprites {

    return new PokemonSprites(
        data.back_default,
        data.back_female,
        data.back_shiny,
        data.back_shiny_female,
        data.front_default,
        data.front_female,
        data.front_shiny,
        data.front_shiny_female
    );
  }

  static getOfficialArtwork(sprites: IPokemonSprites): string {
    return sprites.other['official-artwork'].front_default;
  }
}