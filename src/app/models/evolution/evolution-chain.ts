import { NamedAPIResource } from "../utility/common-models/common-models"
import { ChainLink } from "./chain-link";
/**
 * Les chaînes d'évolution sont essentiellement des arbres généalogiques. 
 * Elles commencent par le stade le plus bas d'une famille 
 * et détaillent les conditions d'évolution de chacun d'entre eux, 
 * ainsi que les Pokémon en lesquels ils peuvent évoluer en remontant la hiérarchie.
 */
export class EvolutionChain {

    constructor(
        private _id :                number,
        private _baby_trigger_item : NamedAPIResource | null,
        private _chain :             ChainLink,
    ) {}

    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }

    get baby_trigger_item(): NamedAPIResource | null { return this._baby_trigger_item; }
    set baby_trigger_item(value: NamedAPIResource | null) { this._baby_trigger_item = value; }

    get chain(): ChainLink { return this._chain; }
    set chain(value: ChainLink) { this._chain = value; }
}