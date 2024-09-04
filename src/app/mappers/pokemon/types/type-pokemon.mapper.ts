import { ITypePokemon } from "src/app/interfaces/pokemon/types";
import { TypePokemon } from "src/app/models/pokemon/types/type-pokemon";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";

export class TypePokemonMapper {

    static mapData(data: ITypePokemon): TypePokemon {

        return new TypePokemon(
            data.slot,
            ApiRessourceMapper.mapToNamedAPIResource(data.pokemon)
        );

    }
  
    static mapDatas(data: ITypePokemon[]): TypePokemon[] {
        return data.map(item => this.mapData(item));
    }
  }
  