import { Effect, NamedAPIResource } from "../../utility/common-models/common-models";

export class AbilityEffectChange {

    constructor(
        private _effectEntries: Effect[],
        private _versionGroup: NamedAPIResource,
    ) {}

    get effectEntries(): Effect[] { return this._effectEntries; }
    set effectEntries(value: Effect[]) { this._effectEntries = value; }

    get versionGroup(): NamedAPIResource { return this._versionGroup; }
    set versionGroup(value: NamedAPIResource) { this._versionGroup = value; }
}