export class PokemonCries {

    constructor(
        private _latest : string,
        private _legacy : string,
    ) {}

    // ---------------------------------------- //
    // ----- Getters et setters classique ----- //
    // ---------------------------------------- //
    get latest(): string { return this._latest; }
    set latest(value: string) { this._latest = value; }

    get legacy(): string { return this._legacy; }
    set legacy(value: string) { this._legacy = value; }
}