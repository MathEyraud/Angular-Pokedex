import { NamedAPIResource } from "../../utility/common-models/common-models";

export class PokemonHeldItem {

    constructor(
        private _item           : NamedAPIResource,
        private _versionDetails : PokemonHeldItemVersion[],
    ) {}

    // ---------------------------------------- //
    // ----- Getters et setters classique ----- //
    // ---------------------------------------- //
    get item(): NamedAPIResource { return this._item; }
    set item(value: NamedAPIResource) { this._item = value; }

    get versionDetails(): PokemonHeldItemVersion[] { return this._versionDetails; }
    set versionDetails(value: PokemonHeldItemVersion[]) { this._versionDetails = value; }
}

export class PokemonHeldItemVersion {

    constructor(
        private _version    : NamedAPIResource,
        private _rarity     : number,
    ) {}

    // ---------------------------------------- //
    // ----- Getters et setters classique ----- //
    // ---------------------------------------- //
    get version(): NamedAPIResource { return this._version; }
    set version(value: NamedAPIResource) { this._version = value; }

    get rarity(): number { return this._rarity; }
    set rarity(value: number) { this._rarity = value; }
}