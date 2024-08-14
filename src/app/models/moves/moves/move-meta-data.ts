import { NamedAPIResource } from "../../utility/common-models/common-models";

export class MoveMetaData {

    constructor(
        private _ailment: NamedAPIResource,
        private _category: NamedAPIResource,
        private _min_hits: number | null,
        private _max_hits: number | null,
        private _min_turns: number | null,
        private _max_turns: number | null,
        private _drain: number,
        private _healing: number,
        private _crit_rate: number,
        private _ailment_chance: number,
        private _flinch_chance: number,
        private _stat_chance: number,
    ) {}

    get ailmentResource(): NamedAPIResource { return this._ailment; }
    set ailmentResource(value: NamedAPIResource) { this._ailment = value; }

    get categoryResource(): NamedAPIResource { return this._category; }
    set categoryResource(value: NamedAPIResource) { this._category = value; }

    get minHits(): number | null { return this._min_hits; }
    set minHits(value: number | null) { this._min_hits = value; }

    get maxHits(): number | null { return this._max_hits; }
    set maxHits(value: number | null) { this._max_hits = value; }

    get minTurns(): number | null { return this._min_turns; }
    set minTurns(value: number | null) { this._min_turns = value; }

    get maxTurns(): number | null { return this._max_turns; }
    set maxTurns(value: number | null) { this._max_turns = value; }

    get drainRate(): number { return this._drain; }
    set drainRate(value: number) { this._drain = value; }

    get healingRate(): number { return this._healing; }
    set healingRate(value: number) { this._healing = value; }

    get critRate(): number { return this._crit_rate; }
    set critRate(value: number) { this._crit_rate = value; }

    get ailmentChance(): number { return this._ailment_chance; }
    set ailmentChance(value: number) { this._ailment_chance = value; }

    get flinchChance(): number { return this._flinch_chance; }
    set flinchChance(value: number) { this._flinch_chance = value; }

    get statChance(): number { return this._stat_chance; }
    set statChance(value: number) { this._stat_chance = value; }
}