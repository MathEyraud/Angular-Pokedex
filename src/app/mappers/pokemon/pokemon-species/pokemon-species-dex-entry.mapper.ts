import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";
import { IPokemonSpeciesDexEntry } from "src/app/interfaces/pokemon-species/pokemon-species";
import { PokemonSpeciesDexEntry } from "src/app/models/pokemon/pokemon-species/pokemon-species-dex-entry";

export class PokemonSpeciesDexEntryMapper  {

    static mapToPokemonSpeciesDexEntry(data: IPokemonSpeciesDexEntry): PokemonSpeciesDexEntry {
        return new PokemonSpeciesDexEntry(
            data.entry_number,
            ApiRessourceMapper.mapToNamedAPIResource(data.pokedex)
        );
    }

    static mapToPokemonSpeciesDexEntries(data: IPokemonSpeciesDexEntry[]): PokemonSpeciesDexEntry[] {
        return data.map(PokemonSpeciesDexEntryMapper.mapToPokemonSpeciesDexEntry);
    }
}
