import { NamedAPIResource } from "../../utility/common-models/common-models";

export class MoveFlavorText {

    constructor(
        private _flavor_text: string,
        private _language: NamedAPIResource,
        private _version_group: NamedAPIResource,
    ) {}

    get flavorText(): string { return this._flavor_text; }
    set flavorText(value: string) { this._flavor_text = value; }

    get language(): NamedAPIResource { return this._language; }
    set language(value: NamedAPIResource) { this._language = value; }

    get versionGroup(): NamedAPIResource { return this._version_group; }
    set versionGroup(value: NamedAPIResource) { this._version_group = value; }
}