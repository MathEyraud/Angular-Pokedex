import { ITypeRelationsPast } from "src/app/interfaces/pokemon/types";
import { TypeRelationsPast } from "src/app/models/pokemon/types/type-relations-past";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";
import { TypeRelationsMapper } from "./type-relations.mapper";

export class TypeRelationsPastMapper {

    static mapData(data: ITypeRelationsPast): TypeRelationsPast {

        return new TypeRelationsPast(
            ApiRessourceMapper.mapToNamedAPIResource(data.generation),
            TypeRelationsMapper.mapData(data.damage_relations)
        );
    }
  
    static mapDatas(data: ITypeRelationsPast[]): TypeRelationsPast[] {
        return data.map(item => this.mapData(item));
    }

}
  