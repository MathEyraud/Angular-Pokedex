import { ContestComboDetail } from "./contest-combo-detail";

export class ContestComboSets {

    constructor(
        private _normal: ContestComboDetail | null,
        private _super: ContestComboDetail | null,
    ) {}

    get normal(): ContestComboDetail | null { return this._normal; }
    set normal(value: ContestComboDetail | null) { this._normal = value; }

    get super(): ContestComboDetail | null { return this._super; }
    set super(value: ContestComboDetail | null) { this._super = value; }
}