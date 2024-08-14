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

export class VersionGameIndex {

    constructor(
        private _gameIndex  : number,
        private _version    : NamedAPIResource,
    ) {}

    // ---------------------------------------- //
    // ----- Getters et setters classique ----- //
    // ---------------------------------------- //
    get gameIndex(): number { return this._gameIndex; }
    set gameIndex(value: number) { this._gameIndex = value; }

    get versionRessource(): NamedAPIResource { return this._version; }
    set versionRessource(value: NamedAPIResource) { this._version = value; }
}

export class Name {

    constructor(
        private _name: string | null,
        private _language: NamedAPIResource
    ) {}

    // Getter and setter for name
    get name() : string | null { return this._name; }
    set name(value: string | null) { this._name = value; }

    // Getter and setter for url
    get languageRessource() : NamedAPIResource { return this._language; }
    set languageRessource(value: NamedAPIResource) { this._language = value; }
}

export class FlavorText {

    constructor(
        private _flavor_text: string | null,
        private _language: NamedAPIResource,
        private _version: NamedAPIResource
    ) {}

    // Getter and setter for flavorText
    get flavorText() : string | null { return this._flavor_text; }
    set flavorText(value: string | null) { this._flavor_text = value; }

    // Getter and setter for language
    get languageRessource() : NamedAPIResource { return this._language; }
    set languageRessource(value: NamedAPIResource) { this._language = value; }

    // Getter and setter for version
    get version() : NamedAPIResource { return this._version; }
    set version(value: NamedAPIResource) { this._version = value; }
}

export class Description {

    constructor(
        private _description: string | null,
        private _language: NamedAPIResource
    ) {}

    // Getter and setter for description
    get description() : string | null { return this._description; }
    set description(value: string | null) { this._description = value; }

    // Getter and setter for language
    get languageRessource() : NamedAPIResource { return this._language; }
    set languageRessource(value: NamedAPIResource) { this._language = value; }
}

export class Effect {

    constructor(
        private _effect: string | null,
        private _language: NamedAPIResource,
    ) {}

    get effect(): string | null { return this._effect; }
    set effect(value: string | null) { this._effect = value; }

    get languageResource(): NamedAPIResource { return this._language; }
    set languageResource(value: NamedAPIResource) { this._language = value; }
}

export class MachineVersionDetail {

    constructor(
        private machine: APIResource,
        private version_group: NamedAPIResource,
    ) {}

    get machineResource(): APIResource { return this.machine; }
    set machineResource(value: APIResource) { this.machine = value; }

    get versionGroupRessource(): NamedAPIResource { return this.version_group; }
    set versionGroupRessource(value: NamedAPIResource) { this.version_group = value; }
}

export class VerboseEffect {

    constructor(
        private effect: string,
        private short_effect: string,
        private language: NamedAPIResource,
    ) {}

    get effectText(): string { return this.effect; }
    set effectText(value: string) { this.effect = value; }

    get shortEffect(): string { return this.short_effect; }
    set shortEffect(value: string) { this.short_effect = value; }

    get languageResource(): NamedAPIResource { return this.language; }
    set languageResource(value: NamedAPIResource) { this.language = value; }
}