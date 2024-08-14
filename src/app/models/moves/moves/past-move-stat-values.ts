import { NamedAPIResource, VerboseEffect } from "../../utility/common-models/common-models";

export class PastMoveStatValues {

    constructor(
        private _accuracy: number | null,
        private _effect_chance: number | null,
        private _power: number | null,
        private _pp: number | null,
        private _effect_entries: VerboseEffect[],
        private _type: NamedAPIResource | null,
        private _version_group: NamedAPIResource,
    ) {}

    get accuracy(): number | null { return this._accuracy; }
    set accuracy(value: number | null) { this._accuracy = value; }

    get effectChance(): number | null { return this._effect_chance; }
    set effectChance(value: number | null) { this._effect_chance = value; }

    get power(): number | null { return this._power; }
    set power(value: number | null) { this._power = value; }

    get PP(): number | null { return this._pp; }
    set PP(value: number | null) { this._pp = value; }

    get effectEntries(): VerboseEffect[] { return this._effect_entries; }
    set effectEntries(value: VerboseEffect[]) { this._effect_entries = value; }

    get type(): NamedAPIResource | null { return this._type; }
    set type(value: NamedAPIResource | null) { this._type = value; }

    get versionGroup(): NamedAPIResource { return this._version_group; }
    set versionGroup(value: NamedAPIResource) { this._version_group = value; }
}