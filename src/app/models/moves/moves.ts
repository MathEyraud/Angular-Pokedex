import { capitalizeFirstLetter } from "src/app/utils/string-utils";
import { APIResource, NamedAPIResource } from "../api-ressource";

export class Moves {

    constructor(
        private _id                      : number,
        private _name                    : string,
        private _accuracy                : number | null,
        private _effect_chance           : number | null,
        private _pp                      : number,
        private _priority                : number,
        private _power                   : number | null,
        private _contest_combos          : ContestComboSets | null,
        private _contest_type            : NamedAPIResource | null,
        private _contest_effect          : APIResource | null,
        private _damage_class            : NamedAPIResource,
        private _effect_entries          : VerboseEffect[],
        private _effect_changes          : AbilityEffectChange[],
        private _learned_by_pokemon      : NamedAPIResource[],
        private _flavor_text_entries     : MoveFlavorText[],
        private _generation              : NamedAPIResource,
        private _machines                : MachineVersionDetail[],
        private _meta                    : MoveMetaData | null,
        private _names                   : Name[],
        private _past_values             : PastMoveStatValues[]  | null,
        private _stat_changes            : MoveStatChange[],
        private _super_contest_effect    : APIResource | null,
        private _target                  : NamedAPIResource,
        private _type                    : NamedAPIResource,
    ) {}

    // ---------------------------------------- //
    // ----- Getters et setters classique ----- //
    // ---------------------------------------- //
    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }

    get name(): string { return this._name; }
    set name(value: string) { this._name = value; }

    get accuracy(): number | null { return this._accuracy; }
    set accuracy(value: number | null) { this._accuracy = value; }

    get effect_chance(): number | null { return this._effect_chance; }
    set effect_chance(value: number | null) { this._effect_chance = value; }

    get pp(): number { return this._pp; }
    set pp(value: number) { this._pp = value; }

    get priority(): number { return this._priority; }
    set priority(value: number) { this._priority = value; }

    get power(): number | null { return this._power; }
    set power(value: number | null) { this._power = value; }

    get contest_combos(): ContestComboSets | null { return this._contest_combos; }
    set contest_combos(value: ContestComboSets | null) { this._contest_combos = value; }

    get contest_type(): NamedAPIResource | null { return this._contest_type; }
    set contest_type(value: NamedAPIResource | null) { this._contest_type = value; }

    get contest_effect(): APIResource | null { return this._contest_effect; }
    set contest_effect(value: APIResource | null) { this._contest_effect = value; }

    get damage_class(): NamedAPIResource { return this._damage_class; }
    set damage_class(value: NamedAPIResource) { this._damage_class = value; }

    get effect_entries(): VerboseEffect[] { return this._effect_entries; }
    set effect_entries(value: VerboseEffect[]) { this._effect_entries = value; }

    get effect_changes(): AbilityEffectChange[] { return this._effect_changes; }
    set effect_changes(value: AbilityEffectChange[]) { this._effect_changes = value; }

    get learned_by_pokemon(): NamedAPIResource[] { return this._learned_by_pokemon; }
    set learned_by_pokemon(value: NamedAPIResource[]) { this._learned_by_pokemon = value; }

    get flavor_text_entries(): MoveFlavorText[] { return this._flavor_text_entries; }
    set flavor_text_entries(value: MoveFlavorText[]) { this._flavor_text_entries = value; }

    get generation(): NamedAPIResource { return this._generation; }
    set generation(value: NamedAPIResource) { this._generation = value; }

    get machines(): MachineVersionDetail[] { return this._machines; }
    set machines(value: MachineVersionDetail[]) { this._machines = value; }

    get meta(): MoveMetaData | null { return this._meta; }
    set meta(value: MoveMetaData | null) { this._meta = value; }

    get names(): Name[] { return this._names; }
    set names(value: Name[]) { this._names = value; }

    get past_values(): PastMoveStatValues[] | null { return this._past_values; }
    set past_values(value: PastMoveStatValues[] | null) { this._past_values = value; }

    get stat_changes(): MoveStatChange[] { return this._stat_changes; }
    set stat_changes(value: MoveStatChange[]) { this._stat_changes = value; }

    get super_contest_effect(): APIResource | null { return this._super_contest_effect; }
    set super_contest_effect(value: APIResource | null) { this._super_contest_effect = value; }

    get target(): NamedAPIResource { return this._target; }
    set target(value: NamedAPIResource) { this._target = value; }

    get type(): NamedAPIResource { return this._type; }
    set type(value: NamedAPIResource) { this._type = value; }

    // ---------------------------------------------- //
    // ----- Getter avec logique supplémentaire ----- //
    // ---------------------------------------------- //
    get formattedName(): string {
        return capitalizeFirstLetter(this._name);
    }

    get formattedAccuracy(): string {
        return this._accuracy ? this._accuracy + ' %' : '';
    }

    get formattedType(): string {
        return capitalizeFirstLetter(this._type.name);
    }

    get formattedDamageClass(): string {
        return capitalizeFirstLetter(this._damage_class.name);
    }
}

export class ContestComboSets {

    // La variable est "super" : mais impossible avec Anguar
    constructor(
        private normal: ContestComboDetail | null,
        private supere: ContestComboDetail | null,
    ) {}

    get normalCombo(): ContestComboDetail | null { return this.normal; }
    set normalCombo(value: ContestComboDetail | null) { this.normal = value; }

    get superCombo(): ContestComboDetail | null { return this.supere; }
    set superCombo(value: ContestComboDetail | null) { this.supere = value; }
}

export class ContestComboDetail {

    constructor(
        private use_before: NamedAPIResource[] | null,
        private use_after: NamedAPIResource[] | null,
    ) {}

    get useBefore(): NamedAPIResource[] | null { return this.use_before; }
    set useBefore(value: NamedAPIResource[] | null) { this.use_before = value; }

    get useAfter(): NamedAPIResource[] | null { return this.use_after; }
    set useAfter(value: NamedAPIResource[] | null) { this.use_after = value; }
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

export class AbilityEffectChange {

    constructor(
        private effect_entries: VerboseEffect[],
        private version_group: NamedAPIResource,
    ) {}

    get effectEntries(): VerboseEffect[] { return this.effect_entries; }
    set effectEntries(value: VerboseEffect[]) { this.effect_entries = value; }

    get versionGroup(): NamedAPIResource { return this.version_group; }
    set versionGroup(value: NamedAPIResource) { this.version_group = value; }
}

export class MoveFlavorText {

    constructor(
        private flavor_text: string,
        private language: NamedAPIResource,
        private version_group: NamedAPIResource,
    ) {}

    get flavorText(): string { return this.flavor_text; }
    set flavorText(value: string) { this.flavor_text = value; }

    get languageResource(): NamedAPIResource { return this.language; }
    set languageResource(value: NamedAPIResource) { this.language = value; }

    get versionGroup(): NamedAPIResource { return this.version_group; }
    set versionGroup(value: NamedAPIResource) { this.version_group = value; }
}

export class MoveMetaData {

    constructor(
        private ailment: NamedAPIResource,
        private category: NamedAPIResource,
        private min_hits: number | null,
        private max_hits: number | null,
        private min_turns: number | null,
        private max_turns: number | null,
        private drain: number,
        private healing: number,
        private crit_rate: number,
        private ailment_chance: number,
        private flinch_chance: number,
        private stat_chance: number,
    ) {}

    get ailmentResource(): NamedAPIResource { return this.ailment; }
    set ailmentResource(value: NamedAPIResource) { this.ailment = value; }

    get categoryResource(): NamedAPIResource { return this.category; }
    set categoryResource(value: NamedAPIResource) { this.category = value; }

    get minHits(): number | null { return this.min_hits; }
    set minHits(value: number | null) { this.min_hits = value; }

    get maxHits(): number | null { return this.max_hits; }
    set maxHits(value: number | null) { this.max_hits = value; }

    get minTurns(): number | null { return this.min_turns; }
    set minTurns(value: number | null) { this.min_turns = value; }

    get maxTurns(): number | null { return this.max_turns; }
    set maxTurns(value: number | null) { this.max_turns = value; }

    get drainRate(): number { return this.drain; }
    set drainRate(value: number) { this.drain = value; }

    get healingRate(): number { return this.healing; }
    set healingRate(value: number) { this.healing = value; }

    get critRate(): number { return this.crit_rate; }
    set critRate(value: number) { this.crit_rate = value; }

    get ailmentChance(): number { return this.ailment_chance; }
    set ailmentChance(value: number) { this.ailment_chance = value; }

    get flinchChance(): number { return this.flinch_chance; }
    set flinchChance(value: number) { this.flinch_chance = value; }

    get statChance(): number { return this.stat_chance; }
    set statChance(value: number) { this.stat_chance = value; }
}

export class MoveStatChange {

    constructor(
        private change: number,
        private stat: NamedAPIResource,
    ) {}

    get statChange(): number { return this.change; }
    set statChange(value: number) { this.change = value; }

    get statResource(): NamedAPIResource { return this.stat; }
    set statResource(value: NamedAPIResource) { this.stat = value; }
}

export class PastMoveStatValues {

    constructor(
        private accuracy: number | null,
        private effect_chance: number | null,
        private power: number | null,
        private pp: number | null,
        private effect_entries: VerboseEffect[],
        private type: NamedAPIResource | null,
        private version_group: NamedAPIResource,
    ) {}

    get pastAccuracy(): number | null { return this.accuracy; }
    set pastAccuracy(value: number | null) { this.accuracy = value; }

    get pastEffectChance(): number | null { return this.effect_chance; }
    set pastEffectChance(value: number | null) { this.effect_chance = value; }

    get pastPower(): number | null { return this.power; }
    set pastPower(value: number | null) { this.power = value; }

    get pastPP(): number | null { return this.pp; }
    set pastPP(value: number | null) { this.pp = value; }

    get pastEffectEntries(): VerboseEffect[] { return this.effect_entries; }
    set pastEffectEntries(value: VerboseEffect[]) { this.effect_entries = value; }

    get pastType(): NamedAPIResource | null { return this.type; }
    set pastType(value: NamedAPIResource | null) { this.type = value; }

    get pastVersionGroup(): NamedAPIResource { return this.version_group; }
    set pastVersionGroup(value: NamedAPIResource) { this.version_group = value; }
}

export class Name {

    constructor(
        private name: string,
        private language: NamedAPIResource,
    ) {}

    get nameText(): string { return this.name; }
    set nameText(value: string) { this.name = value; }

    get languageResource(): NamedAPIResource { return this.language; }
    set languageResource(value: NamedAPIResource) { this.language = value; }
}

export class MachineVersionDetail {

    constructor(
        private machine: APIResource,
        private version_group: NamedAPIResource,
    ) {}

    get machineResource(): APIResource { return this.machine; }
    set machineResource(value: APIResource) { this.machine = value; }

    get versionGroup(): NamedAPIResource { return this.version_group; }
    set versionGroup(value: NamedAPIResource) { this.version_group = value; }
}