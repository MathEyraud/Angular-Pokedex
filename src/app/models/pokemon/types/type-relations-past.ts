import { NamedAPIResource } from "../../utility/common-models/common-models";
import { TypeRelations } from "./type-relations";

export class TypeRelationsPast {

    constructor(
        private _generation: NamedAPIResource,
        private _damageRelations: TypeRelations
    ) {}
  
    // Getters and Setters
    get generation(): NamedAPIResource { return this._generation; }
    set generation(value: NamedAPIResource) { this._generation = value; }
  
    get damageRelations(): TypeRelations { return this._damageRelations; }
    set damageRelations(value: TypeRelations) { this._damageRelations = value; }
  }
  