export class GrowthRateExperienceLevel {

    constructor(
      private _level     : number,
      private _experience: number
    ) {}

    // Getters and Setters
    get level(): number { return this._level; }
    set level(value: number) { this._level = value; }

    get experience(): number { return this._experience; }
    set experience(value: number) { this._experience = value; }
}
  