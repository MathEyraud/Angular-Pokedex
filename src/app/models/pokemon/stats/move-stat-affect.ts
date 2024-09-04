import { NamedAPIResource } from "../../utility/common-models/common-models";

export class MoveStatAffect {
    constructor(
      private _change: number,
      private _move: NamedAPIResource
    ) {}
  
    // Getters and Setters in camelCase
    get change(): number { return this._change; }
    set change(value: number) { this._change = value; }
  
    get move(): NamedAPIResource { return this._move; }
    set move(value: NamedAPIResource) { this._move = value; }
}