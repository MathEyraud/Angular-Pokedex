import { MoveStatAffect } from "./move-stat-affect";

export class MoveStatAffectSets {

    constructor(
      private _increase: MoveStatAffect[],
      private _decrease: MoveStatAffect[]
    ) {}
  
    // Getters and Setters in camelCase
    get increase(): MoveStatAffect[] { return this._increase; }
    set increase(value: MoveStatAffect[]) { this._increase = value; }
  
    get decrease(): MoveStatAffect[] { return this._decrease; }
    set decrease(value: MoveStatAffect[]) { this._decrease = value; }
}  