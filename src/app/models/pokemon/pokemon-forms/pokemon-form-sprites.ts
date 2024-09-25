export class PokemonFormSprites {

    constructor(
        private _frontDefault   : string | null,
        private _frontShiny     : string | null,
        private _backDefault    : string | null,
        private _backShiny      : string | null
    ) {}

    get frontDefault(): string | null { return this._frontDefault; }
    set frontDefault(value: string | null) { this._frontDefault = value; }

    get frontShiny(): string | null { return this._frontShiny; }
    set frontShiny(value: string | null) { this._frontShiny = value; }

    get backDefault(): string | null { return this._backDefault; }
    set backDefault(value: string | null) { this._backDefault = value; }

    get backShiny(): string | null { return this._backShiny; }
    set backShiny(value: string | null) { this._backShiny = value; }
}