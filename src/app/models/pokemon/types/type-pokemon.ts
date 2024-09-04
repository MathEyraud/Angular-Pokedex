import { NamedAPIResource } from "../../utility/common-models/common-models";

export class TypePokemon {

    constructor(
        private _slot: number,
        private _pokemon: NamedAPIResource
    ) {}
  
    // Getters and Setters
    get slot(): number { return this._slot; }
    set slot(value: number) { this._slot = value; }
  
    get pokemon(): NamedAPIResource { return this._pokemon; }
    set pokemon(value: NamedAPIResource) { this._pokemon = value; }
}