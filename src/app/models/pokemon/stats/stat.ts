import { APIResource, Name, NamedAPIResource } from "../../utility/common-models/common-models";
import { MoveStatAffectSets } from "./move-stat-affect-sets";
import { NatureStatAffectSets } from "./nature-stat-affect-sets";

export class Stat {

    constructor(
      private _id: number,
      private _name: string,
      private _gameIndex: number,
      private _isBattleOnly: boolean,
      private _affectingMoves: MoveStatAffectSets,
      private _affectingNatures: NatureStatAffectSets,
      private _characteristics: APIResource[],
      private _moveDamageClass: NamedAPIResource,
      private _names: Name[]
    ) {}
  
    // Getters and Setters in camelCase
    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }
  
    get name(): string { return this._name; }
    set name(value: string) { this._name = value; }
  
    get gameIndex(): number { return this._gameIndex; }
    set gameIndex(value: number) { this._gameIndex = value; }
  
    get isBattleOnly(): boolean { return this._isBattleOnly; }
    set isBattleOnly(value: boolean) { this._isBattleOnly = value; }
  
    get affectingMoves(): MoveStatAffectSets { return this._affectingMoves; }
    set affectingMoves(value: MoveStatAffectSets) { this._affectingMoves = value; }
  
    get affectingNatures(): NatureStatAffectSets { return this._affectingNatures; }
    set affectingNatures(value: NatureStatAffectSets) { this._affectingNatures = value; }
  
    get characteristics(): APIResource[] { return this._characteristics; }
    set characteristics(value: APIResource[]) { this._characteristics = value; }
  
    get moveDamageClass(): NamedAPIResource { return this._moveDamageClass; }
    set moveDamageClass(value: NamedAPIResource) { this._moveDamageClass = value; }
  
    get names(): Name[] { return this._names; }
    set names(value: Name[]) { this._names = value; }
  }
  