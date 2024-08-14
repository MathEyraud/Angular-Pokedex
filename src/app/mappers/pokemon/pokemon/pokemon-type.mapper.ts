import { IPokemonType } from '../../../interfaces/pokemon/pokemon';
import { PokemonType } from '../../../models/pokemon/pokemon/pokemon-type';
import { ApiRessourceMapper } from '../../utility/common-models/api-ressource.mapper';

export class PokemonTypeMapper {

  static mapPokemonType(data: IPokemonType): PokemonType {

    return new PokemonType(
      data.slot,
      ApiRessourceMapper.mapToNamedAPIResource(data.type),
    );
  }

  static mapPokemonTypes(data: IPokemonType[]): PokemonType[] {
    return data.map(PokemonTypeMapper.mapPokemonType);
  }
}