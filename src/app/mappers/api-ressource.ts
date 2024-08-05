import { IAPIResource, INamedAPIResource } from "../interfaces/api-ressource";
import { APIResource, NamedAPIResource } from "../models/api-ressource";

export class ApiRessourceMapper {

    static mapToNamedAPIResource(apiData: INamedAPIResource ): NamedAPIResource {

        return new NamedAPIResource(
            apiData.name,
            apiData.url
        );
    }

    static mapToAPIResource(apiData: IAPIResource ): APIResource {

        return new APIResource(
            apiData.url
        );
    }
}