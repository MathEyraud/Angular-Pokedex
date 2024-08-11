import { PokemonMove } from "./pokemon-move";
import { PokemonSprites } from "./pokemon-sprites";
import { PokemonStat } from "./pokemon-stat";
import { PokemonType } from "./pokemon-type";
import { Evolution, EvolutionChain, EvolutionDetails } from "../evolution-chain";
import { capitalizeFirstLetter } from "src/app/utils/string-utils";
import { PokemonAbility } from "./pokemon-ability";

export class Pokemon {

    constructor(
        private _id               : number,
        private _name             : string              | null,
        private _types            : PokemonType[]       | null,
        private _urlPhoto         : string              | null,
        private _sprites          : PokemonSprites      | null,
        private _height           : number              | null,
        private _weight           : number              | null,
        private _base_experience  : number              | null,
        private _abilities        : PokemonAbility[]    | null,
        private _stats            : PokemonStat[]       | null,
        private _moves            : PokemonMove[]       | null,
        private _evolutionChain   : EvolutionChain      | null,
    ) {}

    // ---------------------------------------- //
    // ----- Getters et setters classique ----- //
    // ---------------------------------------- //
    // id
    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }

    // name
    get name(): string | null { return this._name; }
    set name(value: string | null) { this._name = value; }

    // types
    get types1(): PokemonType | null { return this._types && this._types.length > 0 ? this._types[0] : null;}
    get types2(): PokemonType | null { return this._types && this._types.length > 0 ? this._types[1] : null;}

    get typesName1(): string | null | undefined { return this.types1?.type?.name ?? null;}
    get typesName2(): string | null | undefined{ return this.types2?.type?.name ?? null;}

    get types(): PokemonType[] | null { return this._types; }
    set types(value: PokemonType[] | null) { this._types = value; }

    // urlPhoto
    get urlPhoto(): string | null {return this._urlPhoto;}
    set urlPhoto(value: string | null) {this._urlPhoto = value;}

    // sprites
    get sprites(): PokemonSprites | null {return this._sprites;}
    set sprites(value: PokemonSprites | null) {this._sprites = value;}

    // height
    get height(): number | null {return this._height;}
    set height(value: number | null) {this._height = value;}

    // weight
    get weight(): number | null {return this._weight;}
    set weight(value: number | null) {this._weight = value;}

    // base_experience
    get base_experience(): number | null {return this._base_experience;}
    set base_experience(value: number | null) {this._base_experience = value;}

    // abilities
    get abilities(): PokemonAbility[] | null {return this._abilities;}
    set abilities(value: PokemonAbility[] | null) {this._abilities = value;}

    // stats
    get stats(): PokemonStat[] | null {return this._stats;}
    set stats(value: PokemonStat[] | null) {this._stats = value;}

    // moves
    get moves(): PokemonMove[] | null {return this._moves;}
    set moves(value: PokemonMove[] | null) {this._moves = value;}

    // evolutionChain
    get evolutionChain(): EvolutionChain | null {return this._evolutionChain ?? null;}
    set evolutionChain(value: EvolutionChain | null) {this._evolutionChain = value;}

    get currentEvolution(): Evolution | null {return this._evolutionChain?.currentForm ?? null;}
    get allEvolutions(): { name: string; details: EvolutionDetails }[] {return this._evolutionChain?.getAllEvolutions() ?? [];}

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