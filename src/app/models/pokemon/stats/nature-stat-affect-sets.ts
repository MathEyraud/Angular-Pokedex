import { NamedAPIResource } from "../../utility/common-models/common-models";

export class NatureStatAffectSets {
    constructor(
      private _increase: NamedAPIResource[],
      private _decrease: NamedAPIResource[]
    ) {}
  
    // Getters and Setters in camelCase
    get increase(): NamedAPIResource[] { return this._increase; }
    set increase(value: NamedAPIResource[]) { this._increase = value; }
  
    get decrease(): NamedAPIResource[] { return this._decrease; }
    set decrease(value: NamedAPIResource[]) { this._decrease = value; }
}
  