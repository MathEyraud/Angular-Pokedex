import { NamedAPIResource } from "../../utility/common-models/common-models";

export class AbilityFlavorText {
    constructor(
        private _flavorText     : string,
        private _language       : NamedAPIResource,
        private _versionGroup   : NamedAPIResource
    ) {}

    get flavorText(): string { return this._flavorText; }
    set flavorText(value: string) { this._flavorText = value; }

    get language(): NamedAPIResource { return this._language; }
    set language(value: NamedAPIResource) { this._language = value; }

    get versionGroup(): NamedAPIResource { return this._versionGroup; }
    set versionGroup(value: NamedAPIResource) { this._versionGroup = value; }
}