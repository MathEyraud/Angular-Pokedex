import { NamedAPIResource } from "../../utility/common-models/common-models";

export class TypeRelations {

    constructor(
        private _noDamageTo: NamedAPIResource[],
        private _halfDamageTo: NamedAPIResource[],
        private _doubleDamageTo: NamedAPIResource[],
        private _noDamageFrom: NamedAPIResource[],
        private _halfDamageFrom: NamedAPIResource[],
        private _doubleDamageFrom: NamedAPIResource[]
    ) {}
  
    // Getters and Setters
    get noDamageTo(): NamedAPIResource[] { return this._noDamageTo; }
    set noDamageTo(value: NamedAPIResource[]) { this._noDamageTo = value; }
  
    get halfDamageTo(): NamedAPIResource[] { return this._halfDamageTo; }
    set halfDamageTo(value: NamedAPIResource[]) { this._halfDamageTo = value; }
  
    get doubleDamageTo(): NamedAPIResource[] { return this._doubleDamageTo; }
    set doubleDamageTo(value: NamedAPIResource[]) { this._doubleDamageTo = value; }
  
    get noDamageFrom(): NamedAPIResource[] { return this._noDamageFrom; }
    set noDamageFrom(value: NamedAPIResource[]) { this._noDamageFrom = value; }
  
    get halfDamageFrom(): NamedAPIResource[] { return this._halfDamageFrom; }
    set halfDamageFrom(value: NamedAPIResource[]) { this._halfDamageFrom = value; }
  
    get doubleDamageFrom(): NamedAPIResource[] { return this._doubleDamageFrom; }
    set doubleDamageFrom(value: NamedAPIResource[]) { this._doubleDamageFrom = value; }
}
  