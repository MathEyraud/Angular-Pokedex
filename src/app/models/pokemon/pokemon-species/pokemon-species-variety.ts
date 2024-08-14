import { NamedAPIResource } from "../../utility/common-models/common-models";

export class PokemonSpeciesVariety {

    constructor(
        private _is_default: boolean,
        private _pokemon: NamedAPIResource,
    ) {}

    // Getter and setter for isDefault
    get isDefault() : boolean { return this._is_default; }
    set isDefault(value: boolean) { this._is_default = value; }

    // Getter and setter for pokemon
    get pokemon() : NamedAPIResource { return this._pokemon; }
    set pokemon(value: NamedAPIResource) { this._pokemon = value; }
}
