import { Name, NamedAPIResource } from "../../utility/common-models/common-models";
import { PokemonFormSprites } from "./pokemon-form-sprites";
import { PokemonFormType } from "./pokemon-form-type";

export class PokemonForm {
    
    constructor(
        private _id             : number,
        private _name           : string,
        private _order          : number,
        private _formOrder      : number,
        private _isDefault      : boolean,
        private _isBattleOnly   : boolean,
        private _isMega         : boolean,
        private _formName       : string,
        private _pokemon        : NamedAPIResource,
        private _types          : PokemonFormType[],
        private _sprites        : PokemonFormSprites,
        private _versionGroup   : NamedAPIResource,
        private _names          : Name[],
        private _formNames      : Name[]
    ) {}

    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }

    get name(): string { return this._name; }
    set name(value: string) { this._name = value; }

    get order(): number { return this._order; }
    set order(value: number) { this._order = value; }

    get formOrder(): number { return this._formOrder; }
    set formOrder(value: number) { this._formOrder = value; }

    get isDefault(): boolean { return this._isDefault; }
    set isDefault(value: boolean) { this._isDefault = value; }

    get isBattleOnly(): boolean { return this._isBattleOnly; }
    set isBattleOnly(value: boolean) { this._isBattleOnly = value; }

    get isMega(): boolean { return this._isMega; }
    set isMega(value: boolean) { this._isMega = value; }

    get formName(): string { return this._formName; }
    set formName(value: string) { this._formName = value; }

    get pokemon(): NamedAPIResource { return this._pokemon; }
    set pokemon(value: NamedAPIResource) { this._pokemon = value; }

    get types(): PokemonFormType[] { return this._types; }
    set types(value: PokemonFormType[]) { this._types = value; }

    get sprites(): PokemonFormSprites { return this._sprites; }
    set sprites(value: PokemonFormSprites) { this._sprites = value; }

    get versionGroup(): NamedAPIResource { return this._versionGroup; }
    set versionGroup(value: NamedAPIResource) { this._versionGroup = value; }

    get names(): Name[] { return this._names; }
    set names(value: Name[]) { this._names = value; }

    get formNames(): Name[] { return this._formNames; }
    set formNames(value: Name[]) { this._formNames = value; }
}