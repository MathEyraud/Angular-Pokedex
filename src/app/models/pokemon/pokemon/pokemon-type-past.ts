import { NamedAPIResource } from "../../utility/common-models/common-models";
import { PokemonType } from "./pokemon-type";

export class PokemonTypePast {

    constructor(
        private _generation : NamedAPIResource | null,
        private _type : PokemonType[]  | null,
    ) {}

    // ---------------------------------------- //
    // ----- Getters et setters classique ----- //
    // ---------------------------------------- //
    get generation(): NamedAPIResource  | null { return this._generation; }
    set generation(value: NamedAPIResource | null) { this._generation = value; }

    get type(): PokemonType[] | null { return this._type; }
    set type(value: PokemonType[] | null) { this._type = value; }
}