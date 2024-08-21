import { IEvolutionChain } from "src/app/interfaces/evolution/evolution-chains";
import { EvolutionChain } from "src/app/models/evolution/evolution-chain";
import { ApiRessourceMapper } from "../../utility/common-models/api-ressource.mapper";
import { ChainLinkMapper } from "./chain-link.mapper";

export class EvolutionChainMapper {
    
    static mapToEvolutionChain(data: IEvolutionChain): EvolutionChain {

        return new EvolutionChain(
            data.id,
            data.baby_trigger_item ? ApiRessourceMapper.mapToNamedAPIResource(data.baby_trigger_item) : null,
            ChainLinkMapper.mapToChainLink(data.chain),
        );

    }
}
