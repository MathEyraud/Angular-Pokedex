import { IType } from "src/app/interfaces/pokemon/types";
import { Type } from "src/app/models/pokemon/types/type";
import { TypeRelationsMapper } from "./type-relations.mapper";
import { TypeRelationsPastMapper } from "./type-relations-past.mapper";
import { GenerationGameIndexMapper } from "../../utility/common-models/generation-game-index.mapper";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";
import { NameMapper } from "../../utility/common-models/name.mapper";
import { TypePokemonMapper } from "./type-pokemon.mapper";

export class TypeMapper {

    static mapData(data: IType): Type {

        return new Type(
            data.id,
            data.name,
            TypeRelationsMapper.mapData(data.damage_relations),
            TypeRelationsPastMapper.mapDatas(data.past_damage_relations),
            GenerationGameIndexMapper.mapDatas(data.game_indices),
            ApiRessourceMapper.mapToNamedAPIResource(data.generation),
            ApiRessourceMapper.mapToNamedAPIResource(data.move_damage_class),
            NameMapper.mapNames(data.names),
            TypePokemonMapper.mapDatas(data.pokemon),
            ApiRessourceMapper.mapToNamedAPIResources(data.moves)
        );

    }
}
  