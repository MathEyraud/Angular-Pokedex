import { Pokemon } from "../../../models/pokemon/pokemon/pokemon";
import { PokemonAbilityMapper } from "./pokemon-ability.mapper";
import { PokemonStatMapper } from "./pokemon-stat.mapper";
import { PokemonTypeMapper } from "./pokemon-type.mapper";
import { IPokemon } from "../../../interfaces/pokemon/pokemon";
import { PokemonMoveMapper } from "./pokemon-move.mapper";
import { PokemonSpritesMapper } from "./pokemon-sprites.mapper";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";
import { VersionGameIndexMapper } from "../../utility/common-models/version-game-index.mapper";
import { PokemonHeldItemMapper } from "./pokemon-held-item.mapper";
import { PokemonTypePastMapper } from "./pokemon-type-past.mapper";
import { PokemonCriesMapper } from "./pokemon-cries.mapper";

export class PokemonMapper {
  
    static mapPokemon(data: IPokemon): Pokemon {

        return new Pokemon(
            data.id,
            data.name,
            data.base_experience,
            data.height,
            data.is_default,
            data.order,
            data.weight,
            PokemonAbilityMapper.mapAbilities(data.abilities),
            ApiRessourceMapper.mapToNamedAPIResources(data.forms),
            VersionGameIndexMapper.mapVersionsGameIndex(data.game_indices),
            PokemonHeldItemMapper.mapPokemonHeldItems(data.held_items),
            data.location_area_encounters,
            PokemonMoveMapper.mapPokemonMoves(data.moves),
            PokemonTypePastMapper.mapPokemonTypesPast(data.past_types),
            PokemonSpritesMapper.mapToPokemonSprites(data.sprites),
            PokemonCriesMapper.mapPokemonCries(data.cries),
            ApiRessourceMapper.mapToNamedAPIResource(data.species),
            PokemonStatMapper.mapPokemonStats(data.stats),
            PokemonTypeMapper.mapPokemonTypes(data.types),
        )
    }
}