import { IType } from '../interfaces/pokemon-api-reponse-detail';
import { TypePokemon } from '../models/type-pokemon';

export class TypeMapper {

  static getType(data: IType): TypePokemon {

    return new TypePokemon(
        data.type.name,
        data.type.url
    );
  }

  static getTypes(data: IType[]): TypePokemon[] {
    return data.map(TypeMapper.getType);
  }
}