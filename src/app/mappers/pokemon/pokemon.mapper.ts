import { Pokemon } from "../../models/pokemon/pokemon";
import { PokemonAbilityMapper } from "./pokemon-ability.mapper";
import { PokemonStatMapper } from "./pokemon-stat.mapper";
import { PokemonTypeMapper } from "./pokemon-type.mapper";
import { IPokemon } from "../../interfaces/pokemon/pokemon";
import { PokemonMoveMapper } from "./pokemon-move.mapper";
import { PokemonSpritesMapper } from "./pokemon-sprites.mapper";

export class PokemonMapper {
  
    static mapData(data: IPokemon): Pokemon {

        return new Pokemon(
            data.id,
            data.name,
            PokemonTypeMapper.getTypes(data.types),
            PokemonSpritesMapper.getOfficialArtwork(data.sprites),
            PokemonSpritesMapper.getSprites(data.sprites),
            data.height,
            data.weight,
            data.base_experience,
            PokemonAbilityMapper.mapAbilities(data.abilities),
            PokemonStatMapper.getStats(data.stats),
            PokemonMoveMapper.mapMoves(data.moves),
            null,// evolutionChain sera ajouté séparément
        );
    }
}