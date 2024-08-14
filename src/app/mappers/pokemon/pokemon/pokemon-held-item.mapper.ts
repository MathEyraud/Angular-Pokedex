import { IPokemonHeldItem, IPokemonHeldItemVersion } from "src/app/interfaces/pokemon/pokemon";
import { PokemonHeldItem, PokemonHeldItemVersion } from "src/app/models/pokemon/pokemon/pokemon-held-item";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";

export class PokemonHeldItemMapper {

  static mapPokemonHeldItem(data: IPokemonHeldItem): PokemonHeldItem {

    return new PokemonHeldItem(
      ApiRessourceMapper.mapToNamedAPIResource(data.item),
      PokemonHeldItemVersionMapper.mapPokemonHeldItemVersions(data.version_details),
    );
  }

  static mapPokemonHeldItems(data: IPokemonHeldItem[]): PokemonHeldItem[] {
    return data.map(PokemonHeldItemMapper.mapPokemonHeldItem);
  }
}

export class PokemonHeldItemVersionMapper{

    static mapPokemonHeldItemVersion(data: IPokemonHeldItemVersion): PokemonHeldItemVersion {
  
      return new PokemonHeldItemVersion(
        ApiRessourceMapper.mapToNamedAPIResource(data.version),
        data.rarity,
      );
    }
  
    static mapPokemonHeldItemVersions(data: IPokemonHeldItemVersion[]): PokemonHeldItemVersion[] {
      return data.map(PokemonHeldItemVersionMapper.mapPokemonHeldItemVersion);
    }
  }