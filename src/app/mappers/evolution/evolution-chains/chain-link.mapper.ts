import { IChainLink } from "src/app/interfaces/evolution/evolution-chains";
import { ChainLink } from "src/app/models/evolution/chain-link";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";
import { EvolutionDetailMapper } from "./evolution-detail.mapper";

export class ChainLinkMapper {

    static mapToChainLink(data: IChainLink): ChainLink {

        return new ChainLink(
            data.is_baby,
            ApiRessourceMapper.mapToNamedAPIResource(data.species),
            data.evolution_details ? data.evolution_details.map(ed => EvolutionDetailMapper.mapToEvolutionDetail(ed)) : [],
            data.evolves_to ? data.evolves_to.map(et => ChainLinkMapper.mapToChainLink(et)) : []
        );

    }
}
