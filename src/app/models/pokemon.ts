import { AbilityPokemon } from "./ability-pokemon";
import { MovePokemon } from "./move-pokemon";
import { SpritesPokemon } from "./sprites-pokemon";
import { StatPokemon } from "./stat-pokemon";
import { TypePokemon } from "./type-pokemon";
import { Evolution, EvolutionChain, EvolutionDetails } from "./evolution-chain";

export class Pokemon {

    constructor(
        private _id               : number,
        private _name             : string              | null,
        private _types            : TypePokemon[]       | null,
        private _urlPhoto         : string              | null,
        private _sprites          : SpritesPokemon      | null,
        private _height           : number              | null,
        private _weight           : number              | null,
        private _base_experience  : number              | null,
        private _abilities        : AbilityPokemon[]    | null,
        private _stats            : StatPokemon[]       | null,
        private _moves            : MovePokemon[]       | null,
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
    get types1(): TypePokemon | null { return this._types && this._types.length > 0 ? this._types[0] : null;}
    get types2(): TypePokemon | null { return this._types && this._types.length > 0 ? this._types[1] : null;}

    get types(): TypePokemon[] | null { return this._types; }
    set types(value: TypePokemon[] | null) { this._types = value; }

    // urlPhoto
    get urlPhoto(): string | null {return this._urlPhoto;}
    set urlPhoto(value: string | null) {this._urlPhoto = value;}

    // sprites
    get sprites(): SpritesPokemon | null {return this._sprites;}
    set sprites(value: SpritesPokemon | null) {this._sprites = value;}

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
    get abilities(): AbilityPokemon[] | null {return this._abilities;}
    set abilities(value: AbilityPokemon[] | null) {this._abilities = value;}

    // stats
    get stats(): StatPokemon[] | null {return this._stats;}
    set stats(value: StatPokemon[] | null) {this._stats = value;}

    // moves
    get moves(): MovePokemon[] | null {return this._moves;}
    set moves(value: MovePokemon[] | null) {this._moves = value;}

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
        return this._name ? this._name.toLocaleUpperCase() : 'N/A';
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