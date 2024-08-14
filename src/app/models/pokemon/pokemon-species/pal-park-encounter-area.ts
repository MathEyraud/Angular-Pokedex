import { NamedAPIResource } from "../../utility/common-models/common-models";

export class PalParkEncounterArea {

    constructor(
        private _base_score: number,
        private _rate: number,
        private _area: NamedAPIResource
    ) {}

    // Getter and setter for baseScore
    get baseScore() : number { return this._base_score; }
    set baseScore(value: number) { this._base_score = value; }

    // Getter and setter for rate
    get rate() : number { return this._rate; }
    set rate(value: number) { this._rate = value; }

    // Getter and setter for area
    get area() : NamedAPIResource { return this._area; }
    set area(value: NamedAPIResource) { this._area = value; }
}
