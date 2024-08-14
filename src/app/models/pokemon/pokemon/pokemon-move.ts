import { capitalizeFirstLetter } from "src/app/utils/string-utils";
import { NamedAPIResource } from "../../utility/common-models/common-models";

export class PokemonMove {

    constructor(
        private _move                    : NamedAPIResource,
        private _version_group_details   : PokemonMoveVersion[],
    ) {}

    // ---------------------------------------- //
    // ----- Getters et setters classique ----- //
    // ---------------------------------------- //
    get move(): NamedAPIResource {return this._move;}
    set move(value: NamedAPIResource) {this._move = value;}

    get version_group_details(): PokemonMoveVersion[] {return this._version_group_details;}
    set version_group_details(value: PokemonMoveVersion[]) {this._version_group_details = value;}

    // ---------------------------------------------- //
    // ----- Getter avec logique supplémentaire ----- //
    // ---------------------------------------------- //
    get displayMoveName(): string {
        return `${capitalizeFirstLetter(this._move.name)}`;
        
    }

    get versions() : PokemonMoveVersion[] {
        return this._version_group_details;
    } 
}

export class PokemonMoveVersion {

    constructor(
        private _level_learned_at    : number,
        private _move_learn_method   : NamedAPIResource,
        private _version_group       : NamedAPIResource,
    ) {}

    // ---------------------------------------- //
    // ----- Getters et setters classique ----- //
    // ---------------------------------------- //
    get level_learned_at(): number {return this._level_learned_at;}
    set level_learned_at(value: number) {this._level_learned_at = value;}

    get move_learn_method(): NamedAPIResource {return this._move_learn_method;}
    set move_learn_method(value: NamedAPIResource) {this._move_learn_method = value;}

    get version_group(): NamedAPIResource {return this._version_group;}
    set version_group(value: NamedAPIResource) {this._version_group = value;}

    // ---------------------------------------------- //
    // ----- Getter avec logique supplémentaire ----- //
    // ---------------------------------------------- //
    
}