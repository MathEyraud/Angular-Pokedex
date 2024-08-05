import { Pokemon } from "../models/pokemon";
import { MoveMapper } from "./move.mapper";
import { AbilityMapper } from "./ability.mapper";
import { SpriteMapper } from "./sprite.mapper";
import { StatMapper } from "./stat.mapper";
import { TypeMapper } from "./type.mapper";
import { IPokemon } from "../interfaces/pokemon";

export class PokemonMapper {
  
    static getData(data: IPokemon): Pokemon {

        return new Pokemon(
            data.id,
            data.name,
            TypeMapper.getTypes(data.types),
            SpriteMapper.getOfficialArtwork(data.sprites),
            SpriteMapper.getSprites(data.sprites),
            data.height,
            data.weight,
            data.base_experience,
            AbilityMapper.getAbilities(data.abilities),
            StatMapper.getStats(data.stats),
            MoveMapper.getMoves(data.moves),
            null,// evolutionChain sera ajouté séparément
        );
    }
}