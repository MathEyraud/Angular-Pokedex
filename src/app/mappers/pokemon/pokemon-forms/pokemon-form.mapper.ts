import { IPokemonForm } from "src/app/interfaces/pokemon/PokemonForm";
import { PokemonForm } from "src/app/models/pokemon/pokemon-forms/pokemon-form";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";
import { NameMapper } from "../../utility/common-models/name.mapper";
import { PokemonFormSpritesMapper } from "./pokemon-form-sprites.mapper";
import { PokemonFormTypeMapper } from "./pokemon-form-type.mapper";

export class PokemonFormMapper {

    static toModel(data: IPokemonForm): PokemonForm {

        return new PokemonForm(
            data.id,
            data.name,
            data.order,
            data.form_order,
            data.is_default,
            data.is_battle_only,
            data.is_mega,
            data.form_name,
            ApiRessourceMapper.mapToNamedAPIResource(data.pokemon),
            PokemonFormTypeMapper.toModels(data.types),
            PokemonFormSpritesMapper.toModel(data.sprites),
            ApiRessourceMapper.mapToNamedAPIResource(data.version_group),
            NameMapper.mapNames(data.names),
            NameMapper.mapNames(data.form_names),
        );
    }

    static toModels(data: IPokemonForm[]): PokemonForm[] {
        return data.map(PokemonFormMapper.toModel);
    }
}