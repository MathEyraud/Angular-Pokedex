import { PokemonMove } from "./pokemon-move";
import { PokemonSprites } from "./pokemon-sprites";
import { PokemonStat } from "./pokemon-stat";
import { PokemonType } from "./pokemon-type";
import { capitalizeFirstLetter } from "src/app/utils/string-utils";
import { PokemonAbility } from "./pokemon-ability";
import { NamedAPIResource, VersionGameIndex } from "../../utility/common-models/common-models";
import { PokemonHeldItem } from "./pokemon-held-item";
import { PokemonTypePast } from "./pokemon-type-past";
import { PokemonCries } from "./pokemon-cries";

export class Pokemon {

    constructor(
        private _id                     : number,
        private _name                   : string                | null,
        private _baseExperience         : number                | null,
        private _height                 : number                | null,
        private _isDefault              : Boolean,
        private _order                  : number,
        private _weight                 : number                | null,
        private _abilities              : PokemonAbility[]      | null,
        private _forms                  : NamedAPIResource[]    | null,
        private _gameIndices            : VersionGameIndex[],
        private _heldItems              : PokemonHeldItem[]     | null, 
        private _locationAreaEncounters : string,
        private _moves                  : PokemonMove[]         | null,
        private _pastTypes              : PokemonTypePast[]     | null,
        private _sprites                : PokemonSprites        | null,
        private _cries                  : PokemonCries,
        private _species                : NamedAPIResource,
        private _stats                  : PokemonStat[],
        private _types                  : PokemonType[],
    ) {}

    // ---------------------------------------- //
    // ----- Getters et setters classique ----- //
    // ---------------------------------------- //
    // id
    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }

    // order
    get order(): number { return this._order; }
    set order(value: number) { this._order = value; }

    // name
    get name(): string | null { return this._name; }
    set name(value: string | null) { this._name = value; }

    // locationAreaEncounters
    get locationAreaEncounters(): string { return this._locationAreaEncounters; }
    set locationAreaEncounters(value: string) { this._locationAreaEncounters = value; }

    // types
    get types1(): PokemonType | null { return this._types && this._types.length > 0 ? this._types[0] : null;}
    get types2(): PokemonType | null { return this._types && this._types.length > 0 ? this._types[1] : null;}

    get typesName1(): string | null { return this.types1?.type?.name ?? null;}
    get typesName2(): string | null { return this.types2?.type?.name ?? null;}

    get types(): PokemonType[]{ return this._types; }
    set types(value: PokemonType[]) { this._types = value; }

    // sprites
    get sprites(): PokemonSprites | null {return this._sprites;}
    set sprites(value: PokemonSprites | null) {this._sprites = value;}

    // cries
    get cries(): PokemonCries {return this._cries;}
    set cries(value: PokemonCries) {this._cries = value;}

    // height
    get height(): number | null {return this._height;}
    set height(value: number | null) {this._height = value;}

    // weight
    get weight(): number | null {return this._weight;}
    set weight(value: number | null) {this._weight = value;}

    // base_experience
    get base_experience(): number | null {return this._baseExperience;}
    set base_experience(value: number | null) {this._baseExperience = value;}

    // abilities
    get abilities(): PokemonAbility[] | null {return this._abilities;}
    set abilities(value: PokemonAbility[] | null) {this._abilities = value;}

    // stats
    get stats(): PokemonStat[] {return this._stats;}
    set stats(value: PokemonStat[]) {this._stats = value;}

    // moves
    get moves(): PokemonMove[] | null {return this._moves;}
    set moves(value: PokemonMove[] | null) {this._moves = value;}

    // forms
    get forms(): NamedAPIResource[] | null {return this._forms;}
    set forms(value: NamedAPIResource[] | null) {this._forms = value;}

    // species
    get species(): NamedAPIResource {return this._species;}
    set species(value: NamedAPIResource) {this._species = value;}

    // gameIndices
    get gameIndices(): VersionGameIndex[] {return this._gameIndices;}
    set gameIndices(value: VersionGameIndex[]) {this._gameIndices = value;}

    // heldItems
    get heldItems(): PokemonHeldItem[] | null {return this._heldItems;}
    set heldItems(value: PokemonHeldItem[] | null) {this._heldItems = value;}

    // pastTypes
    get pastTypes(): PokemonTypePast[] | null {return this._pastTypes;}
    set pastTypes(value: PokemonTypePast[] | null) {this._pastTypes = value;}

    // isDefault
    get isDefault(): Boolean {return this._isDefault;}
    set isDefault(value: Boolean) {this._isDefault = value;}

    // ---------------------------------------------- //
    // ----- Getter avec logique supplémentaire ----- //
    // ---------------------------------------------- //
    // AFFICHAGE CHIFFRE POKEMON : PERMET D'AFFICHER LE NUMERO AVEC 4 CHIFFRES
    get formattedId(): string {
        if (this._id < 10)        {return `000${this._id}`} 
        else if (this._id < 100)  {return `00${this._id}`} 
        else if (this._id < 1000) {return `0${this._id}`} 
        else                      {return `${this._id}`;}
    }

    get formattedName(): string {
        return this._name  ? capitalizeFirstLetter(this._name) : 'N/A';
    }

    // getter pour la hauteur formatée avec un chiffre après la virgule
    get formattedHeight(): string | null {
        return this._height ? (this._height / 10).toFixed(1) : null;
    }

    // getter pour le poids formaté avec un chiffre après la virgule
    get formattedWeight(): string | null {
        return this._weight ? (this._weight / 10).toFixed(1) : null;
    }


}