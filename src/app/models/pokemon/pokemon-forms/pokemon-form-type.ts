import { NamedAPIResource } from "../../utility/common-models/common-models";

export class PokemonFormType {
    constructor(
        private _slot: number,
        private _type: NamedAPIResource
    ) {}

    get slot(): number { return this._slot; }
    set slot(value: number) { this._slot = value; }

    get type(): NamedAPIResource { return this._type; }
    set type(value: NamedAPIResource) { this._type = value; }
}