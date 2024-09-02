import { IPokemonSpecies } from "src/app/interfaces/pokemon-species/pokemon-species";
import { PokemonSpecies } from "src/app/models/pokemon/pokemon-species/pokemon-species";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";
import { FlavorTextMapper } from "../../utility/common-models/flavor-text.mapper";
import { DescriptionMapper } from "../../utility/common-models/description.mapper";
import { GenusMapper } from "./genus.mapper";
import { NameMapper } from "../../utility/common-models/name.mapper";
import { PalParkEncounterAreaMapper } from "./pal-park-encounter-area.mapper";
import { PokemonSpeciesDexEntryMapper } from "./pokemon-species-dex-entry.mapper";
import { PokemonSpeciesVarietyMapper } from "./pokemon-species-variety";

export class PokemonSpeciesMapper {
  
    static mapData(data: IPokemonSpecies): PokemonSpecies {

        return new PokemonSpecies(
            data.base_happiness,
            data.capture_rate,
            ApiRessourceMapper.mapToNamedAPIResource(data.color),
            ApiRessourceMapper.mapToNamedAPIResources(data.egg_groups),
            ApiRessourceMapper.mapToAPIResource(data.evolution_chain),
            data.evolves_from_species ? ApiRessourceMapper.mapToNamedAPIResource(data.evolves_from_species) : null,
            FlavorTextMapper.mapToFlavorsText(data.flavor_text_entries),
            DescriptionMapper.mapToDescriptions(data.form_descriptions),
            data.forms_switchable,
            data.gender_rate,
            GenusMapper.mapToGenuss(data.genera),
            ApiRessourceMapper.mapToNamedAPIResource(data.generation),
            ApiRessourceMapper.mapToNamedAPIResource(data.growth_rate),
            data.habitat ? ApiRessourceMapper.mapToNamedAPIResource(data.habitat) : null,
            data.has_gender_differences,
            data.hatch_counter,
            data.id,
            data.is_baby,
            data.is_legendary,
            data.is_mythical,
            data.name,
            NameMapper.mapNames(data.names),
            data.order,
            PalParkEncounterAreaMapper.mapToPalParkEncounterAreas(data.pal_park_encounters),
            PokemonSpeciesDexEntryMapper.mapToPokemonSpeciesDexEntries(data.pokedex_numbers),
            data.shape ? ApiRessourceMapper.mapToNamedAPIResource(data.shape) : null,
            PokemonSpeciesVarietyMapper.mapToPokemonSpeciesVarieties(data.varieties),
        )
    }
}