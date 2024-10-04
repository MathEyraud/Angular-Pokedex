import { NamedAPIResource } from "../../utility/common-models/common-models";

export class AbilityPokemon {

    constructor(
        private _isHidden   : boolean,
        private _slot       : number,
        private _pokemon    : NamedAPIResource,
    ) {}

    get isHidden(): boolean { return this._isHidden; }
    set isHidden(value: boolean) { this._isHidden = value; }

    get slot(): number { return this._slot; }
    set slot(value: number) { this._slot = value; }

    get pokemon(): NamedAPIResource { return this._pokemon; }
    set pokemon(value: NamedAPIResource) { this._pokemon = value; }
}