import { ITypeRelations } from "src/app/interfaces/pokemon/types";
import { TypeRelations } from "src/app/models/pokemon/types/type-relations";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";

export class TypeRelationsMapper {

    static mapData(data: ITypeRelations): TypeRelations {

        return new TypeRelations(
            ApiRessourceMapper.mapToNamedAPIResources(data.no_damage_to),
            ApiRessourceMapper.mapToNamedAPIResources(data.half_damage_to),
            ApiRessourceMapper.mapToNamedAPIResources(data.double_damage_to),
            ApiRessourceMapper.mapToNamedAPIResources(data.no_damage_from),
            ApiRessourceMapper.mapToNamedAPIResources(data.half_damage_from),
            ApiRessourceMapper.mapToNamedAPIResources(data.double_damage_from)
        );

    }

  }
  