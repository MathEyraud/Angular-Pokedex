import { NamedAPIResource } from "../utility/common-models/common-models";
import { EvolutionDetail } from "./evolution-detail";

/**
 * Représente la chaîne d'évolution complète d'un Pokémon.
 */
export class ChainLink {

    constructor(
        private _is_baby :           boolean,
        private _species :           NamedAPIResource,
        private _evolution_detail : EvolutionDetail[],
        private _evolves_to :        ChainLink[],
    ) {}

    get isBaby(): boolean { return this._is_baby; }
    set isBaby(value: boolean) { this._is_baby = value; }

    get species(): NamedAPIResource { return this._species; }
    set species(value: NamedAPIResource) { this._species = value; }

    get evolutionDetail(): EvolutionDetail[] { return this._evolution_detail; }
    set evolutionDetail(value: EvolutionDetail[]) { this._evolution_detail = value; }

    get evolvesTo(): ChainLink[] { return this._evolves_to; }
    set evolvesTo(value: ChainLink[]) { this._evolves_to = value; }
}