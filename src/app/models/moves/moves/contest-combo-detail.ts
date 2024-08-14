import { NamedAPIResource } from "../../utility/common-models/common-models";

export class ContestComboDetail {

    constructor(
        private _use_before: NamedAPIResource[] | null,
        private _use_after: NamedAPIResource[] | null,
    ) {}

    get useBeforeRessource(): NamedAPIResource[] | null { return this._use_before; }
    set useBeforeRessource(value: NamedAPIResource[] | null) { this._use_before = value; }

    get useAfterRessource(): NamedAPIResource[] | null { return this._use_after; }
    set useAfterRessource(value: NamedAPIResource[] | null) { this._use_after = value; }
}