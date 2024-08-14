import { IAPIResource, INamedAPIResource } from "../../../interfaces/utility/common-models/common-models";
import { APIResource, NamedAPIResource } from "../../../models/utility/common-models/common-models";

export class ApiRessourceMapper {

    static mapToNamedAPIResource(apiData: INamedAPIResource ): NamedAPIResource {

        return new NamedAPIResource(
            apiData.name,
            apiData.url
        );
    }

    static mapToNamedAPIResources(apiDatas: INamedAPIResource[] ): NamedAPIResource[] {
        return apiDatas.map(ApiRessourceMapper.mapToNamedAPIResource);
    }

    static mapToAPIResource(apiData: IAPIResource ): APIResource {
        return new APIResource(apiData.url);
    }

    static mapToAPIResources(apiData: IAPIResource[] ): APIResource[] {
        return apiData.map(ApiRessourceMapper.mapToAPIResource);
    }
}