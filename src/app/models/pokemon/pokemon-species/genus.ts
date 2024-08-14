import { NamedAPIResource } from "../../utility/common-models/common-models";

export class Genus {

    constructor(
        private _genus: string | null,
        private _language: NamedAPIResource,
    ) {}

    // Getter and setter for genus
    get genus() : string | null { return this._genus; }
    set genus(value: string) { this._genus = value; }

    // Getter and setter for language
    get languageRessource() : NamedAPIResource { return this._language; }
    set languageRessource(value: NamedAPIResource) { this._language = value; }
}
