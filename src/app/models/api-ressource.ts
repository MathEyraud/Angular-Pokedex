export class NamedAPIResource {

    constructor(
        private _name: string,
        private _url: string,
    ) {}

    // ---------------------------------------- //
    // ----- Getters et setters classique ----- //
    // ---------------------------------------- //
    get name(): string { return this._name; }
    set name(value: string) { this._name = value; }

    get url(): string { return this._url; }
    set url(value: string) { this._url = value; }
    
}

export class APIResource {
    constructor(
        private _url: string,
    ) {}

    // ---------------------------------------- //
    // ----- Getters et setters classique ----- //
    // ---------------------------------------- //
    get url(): string { return this._url; }
    set url(value: string) { this._url = value; }
}