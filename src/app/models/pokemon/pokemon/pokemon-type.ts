import { NamedAPIResource } from "../../utility/common-models/common-models";

export class PokemonType {

    constructor(
        private _slot : number | null,
        private _type : NamedAPIResource | null,
    ) {}

    // ---------------------------------------- //
    // ----- Getters et setters classique ----- //
    // ---------------------------------------- //
    get slot(): number | null { return this._slot; }
    set slot(value: number | null) { this._slot = value; }

    get type(): NamedAPIResource | null { return this._type; }
    set type(value: NamedAPIResource | null) { this._type = value; }
}