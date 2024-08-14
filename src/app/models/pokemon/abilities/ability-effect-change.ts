import { Effect, NamedAPIResource } from "../../utility/common-models/common-models";

export class AbilityEffectChange {

    constructor(
        private effect_entries: Effect[],
        private version_group: NamedAPIResource,
    ) {}

    get effectEntries(): Effect[] { return this.effect_entries; }
    set effectEntries(value: Effect[]) { this.effect_entries = value; }

    get versionGroup(): NamedAPIResource { return this.version_group; }
    set versionGroup(value: NamedAPIResource) { this.version_group = value; }
}