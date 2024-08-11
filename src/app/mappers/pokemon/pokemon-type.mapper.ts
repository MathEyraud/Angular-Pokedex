import { IPokemonType } from '../../interfaces/pokemon/pokemon';
import { PokemonType } from '../../models/pokemon/pokemon-type';
import { ApiRessourceMapper } from '../api-ressource.mapper';

export class PokemonTypeMapper {

  static getType(data: IPokemonType): PokemonType {

    return new PokemonType(
      data.slot,
      ApiRessourceMapper.mapToNamedAPIResource(data.type),
    );
  }

  static getTypes(data: IPokemonType[]): PokemonType[] {
    return data.map(PokemonTypeMapper.getType);
  }
}