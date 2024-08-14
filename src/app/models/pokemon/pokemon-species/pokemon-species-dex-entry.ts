import { NamedAPIResource } from "../../utility/common-models/common-models";

export class PokemonSpeciesDexEntry {

    constructor(
        private _entry_number: number,
        private _pokedex: NamedAPIResource,
    ) {}

    // Getter and setter for entryNumber
    get entryNumber() : number { return this._entry_number; }
    set entryNumber(value: number) { this._entry_number = value; }

    // Getter and setter for pokedex
    get pokedex() : NamedAPIResource { return this._pokedex; }
    set pokedex(value: NamedAPIResource) { this._pokedex = value; }
}
