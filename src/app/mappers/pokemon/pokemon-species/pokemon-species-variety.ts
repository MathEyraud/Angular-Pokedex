import { Genus } from "src/app/models/pokemon/pokemon-species/genus";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";
import { IGenus, IPokemonSpeciesVariety } from "src/app/interfaces/pokemon-species/pokemon-species";
import { PokemonSpeciesVariety } from "src/app/models/pokemon/pokemon-species/pokemon-species-variety";

export class PokemonSpeciesVarietyMapper  {

    static mapToPokemonSpeciesVariety(data: IPokemonSpeciesVariety): PokemonSpeciesVariety {
        return new PokemonSpeciesVariety(
            data.is_default,
            ApiRessourceMapper.mapToNamedAPIResource(data.pokemon)
        );
    }

    static mapToPokemonSpeciesVarieties(data: IPokemonSpeciesVariety[]): PokemonSpeciesVariety[] {
        return data.map(PokemonSpeciesVarietyMapper.mapToPokemonSpeciesVariety);
    }
}
