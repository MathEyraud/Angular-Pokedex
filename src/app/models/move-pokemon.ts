import { IPokemonMove, IPokemonMoveVersion } from "../interfaces/move-pokemon";

export class PokemonMove {

    constructor(public moveData : IPokemonMove) {}

    get displayMoveName(): string {
        return `${this.moveData.move.name}`;
    }

    get versions() : IPokemonMoveVersion[] {
        return this.moveData.version_group_details;
    } 
}