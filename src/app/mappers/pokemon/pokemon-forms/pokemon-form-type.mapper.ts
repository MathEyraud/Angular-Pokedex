import { IPokemonFormType } from "src/app/interfaces/pokemon/PokemonForm";
import { PokemonFormType } from "src/app/models/pokemon/pokemon-forms/pokemon-form-type";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";

export class PokemonFormTypeMapper {

    static toModel(data: IPokemonFormType): PokemonFormType {

        return new PokemonFormType(
            data.slot,
            ApiRessourceMapper.mapToNamedAPIResource(data.type)
        );

    }

    static toModels(data: IPokemonFormType[]): PokemonFormType[] {
        return data.map(PokemonFormTypeMapper.toModel);
    }
}
