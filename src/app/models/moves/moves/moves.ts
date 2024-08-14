import { capitalizeFirstLetter } from "src/app/utils/string-utils";
import { APIResource, MachineVersionDetail, Name, NamedAPIResource, VerboseEffect } from "../../utility/common-models/common-models";
import { AbilityEffectChange } from "../../pokemon/abilities/ability-effect-change";
import { ContestComboSets } from "./contest-combo-sets";
import { MoveFlavorText } from "./move-flavor-text";
import { MoveMetaData } from "./move-meta-data";
import { PastMoveStatValues } from "./past-move-stat-values";
import { MoveStatChange } from "./move-stat-change";

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