import { IAPIResource, IApiResponse, INamedAPIResource } from "../../../interfaces/utility/common-models/common-models";
import { APIResource, ApiResponse, NamedAPIResource } from "../../../models/utility/common-models/common-models";

export class ApiRessourceMapper {

    static mapToAPIResponse(apiData: IApiResponse ): ApiResponse {

        return new ApiResponse(
            apiData.count,
            apiData.next,
            apiData.previous,
            ApiRessourceMapper.mapToNamedAPIResources(apiData.results),
        );
    }

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