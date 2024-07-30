import { ISprites } from "../interfaces/sprites";
import { SpritesPokemon } from "../models/sprites-pokemon";

export class SpriteMapper {

  static getSprites(data: ISprites): SpritesPokemon {

    return new SpritesPokemon(
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

  static getOfficialArtwork(sprites: ISprites): string {
    return sprites.other['official-artwork'].front_default;
  }
}