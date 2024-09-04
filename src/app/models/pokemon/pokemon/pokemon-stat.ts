import { capitalizeFirstLetter } from "src/app/utils/string-utils";
import { NamedAPIResource } from "../../utility/common-models/common-models";

export class PokemonStat {

    constructor(
        private _stat       : NamedAPIResource,
        private _effort     : number,
        private _baseStat   : number,
    ) {}

    // ---------------------------------------- //
    // ----- Getters et setters classique ----- //
    // ---------------------------------------- //
    // _stat
    get stat(): NamedAPIResource {return this._stat;}
    set stat(value: NamedAPIResource) {this._stat = value;}
    
    // _effort
    get effort(): number {return this._effort;}
    set effort(value: number) {this._effort = value;}

    // _baseStat
    get baseStat(): number {return this._baseStat;}
    set baseStat(value: number) {this._baseStat = value;}

    // ---------------------------------------------- //
    // ----- Getter avec logique supplémentaire ----- //
    // ---------------------------------------------- //
    get fomatedNameStat(): string {return capitalizeFirstLetter(this._stat.name)}
}