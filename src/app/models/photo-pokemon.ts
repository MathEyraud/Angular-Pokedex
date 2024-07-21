import { Pokemon } from "./pokemon";

export class PhotoPokemon {
    url     : string  = '';
    pokemon : Pokemon;

    /*constructor(){
        this.pokemon = new Pokemon();
    }*/

    constructor(url : string, pokemon : Pokemon){
        this.url        = url;
        this.pokemon    = pokemon;
    }
}