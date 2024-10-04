import { capitalizeFirstLetter } from "src/app/utils/string-utils";
import { NamedAPIResource } from "../../utility/common-models/common-models";

export class PokemonAbility {

    constructor(
        private _is_hidden  : boolean,
        private _slot       : number,
        private _ability    : NamedAPIResource,
    ) {}

    // ---------------------------------------- //
    // ----- Getters et setters classique ----- //
    // ---------------------------------------- //
    get isHidden(): boolean {return this._is_hidden;}
    set isHidden(value: boolean) {this._is_hidden = value;}

    get slot(): number {return this._slot;}
    set slot(value: number) {this._slot = value;}

    get ability(): NamedAPIResource {return this._ability;}
    set ability(value: NamedAPIResource) {this._ability = value;}

    get name(): string {return this._ability.name;}
    set name(value: string) {this._ability.name = value;}

    get url(): string {return this._ability.url;}
    set url(value: string) {this._ability.url = value;}

    // ---------------------------------------------- //
    // ----- Getter avec logique supplémentaire ----- //
    // ---------------------------------------------- //
    get formattedName(): string {
        return capitalizeFirstLetter(this._ability.name);
    }
}