import { Name, NamedAPIResource } from "../../utility/common-models/common-models";
import { GenerationGameIndex } from "../../utility/common-models/generation-game-index";
import { TypePokemon } from "./type-pokemon";
import { TypeRelations } from "./type-relations";
import { TypeRelationsPast } from "./type-relations-past";

export class Type {

    constructor(
        private _id                   : number,
        private _name                 : string,
        private _damageRelations      : TypeRelations,
        private _pastDamageRelations  : TypeRelationsPast[],
        private _gameIndices          : GenerationGameIndex[],
        private _generation           : NamedAPIResource,
        private _moveDamageClass      : NamedAPIResource,
        private _names                : Name[],
        private _pokemon              : TypePokemon[],
        private _moves                : NamedAPIResource[]
    ) {}
  
    // Getters and Setters
    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }
  
    get name(): string { return this._name; }
    set name(value: string) { this._name = value; }
  
    get damageRelations(): TypeRelations { return this._damageRelations; }
    set damageRelations(value: TypeRelations) { this._damageRelations = value; }
  
    get pastDamageRelations(): TypeRelationsPast[] { return this._pastDamageRelations; }
    set pastDamageRelations(value: TypeRelationsPast[]) { this._pastDamageRelations = value; }
  
    get gameIndices(): GenerationGameIndex[] { return this._gameIndices; }
    set gameIndices(value: GenerationGameIndex[]) { this._gameIndices = value; }
  
    get generation(): NamedAPIResource { return this._generation; }
    set generation(value: NamedAPIResource) { this._generation = value; }
  
    get moveDamageClass(): NamedAPIResource { return this._moveDamageClass; }
    set moveDamageClass(value: NamedAPIResource) { this._moveDamageClass = value; }
  
    get names(): Name[] { return this._names; }
    set names(value: Name[]) { this._names = value; }
  
    get pokemon(): TypePokemon[] { return this._pokemon; }
    set pokemon(value: TypePokemon[]) { this._pokemon = value; }
  
    get moves(): NamedAPIResource[] { return this._moves; }
    set moves(value: NamedAPIResource[]) { this._moves = value; }
}
  