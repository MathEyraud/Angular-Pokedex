import { NamedAPIResource } from "./common-models";

export class GenerationGameIndex {

    constructor(
        private _gameIndex: number,
        private _generation: NamedAPIResource
    ) {}
  
    // Getters and Setters
    get gameIndex(): number { return this._gameIndex; }
    set gameIndex(value: number) { this._gameIndex = value; }
  
    get generation(): NamedAPIResource { return this._generation; }
    set generation(value: NamedAPIResource) { this._generation = value; }
}