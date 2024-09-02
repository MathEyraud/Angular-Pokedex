import { capitalizeFirstLetter } from "src/app/utils/string-utils";
import { Description, NamedAPIResource } from "../../utility/common-models/common-models";
import { GrowthRateExperienceLevel } from "./growth-rate-experience-level.model";

export class GrowthRate {

  constructor(
    private _id             : number,
    private _name           : string,
    private _formula        : string,
    private _descriptions   : Description[],
    private _levels         : GrowthRateExperienceLevel[],
    private _pokemonSpecies : NamedAPIResource[]
  ) {}

  // ---------------------------------------- //
  // ----- Getters et setters classique ----- //
  // ---------------------------------------- //
  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }

  get formula(): string { return this._formula; }
  set formula(value: string) { this._formula = value; }

  get descriptions(): Description[] { return this._descriptions; }
  set descriptions(value: Description[]) { this._descriptions = value; }

  get levels(): GrowthRateExperienceLevel[] { return this._levels; }
  set levels(value: GrowthRateExperienceLevel[]) { this._levels = value; }

  get pokemonSpeciesRessource(): NamedAPIResource[] { return this._pokemonSpecies; }
  set pokemonSpeciesRessource(value: NamedAPIResource[]) { this._pokemonSpecies = value; }

  // ---------------------------------------------- //
  // ----- Getter avec logique supplémentaire ----- //
  // ---------------------------------------------- //
  get formattedName(): string {
    return capitalizeFirstLetter(this._name);
  }

  getFormattedFormula(): string {
    switch (this._id) {
      case 1:
        return '\\frac{5x^3}{4}';
      case 2:
        return 'x^3';
      case 3:
        return '\\frac{4x^3}{5}';
      case 4:
        return '\\frac{6x^3}{5} - 15x^2 + 100x - 140';
      case 5:
        return '\\begin{cases}\n\\frac{ x^3 \\left( 100 - x \\right) }{50},    & \\text{if } x \\leq 50  \\\\\n\\frac{ x^3 \\left( 150 - x \\right) }{100},   & \\text{if } 50 < x \\leq 68  \\\\\n\\frac{ x^3 \\left( 1274 + (x \\bmod 3)^2 - 9 (x \\bmod 3) - 20 \\left\\lfloor \\frac{x}{3} \\right\\rfloor \\right) }{1000}, & \\text{if } 68 < x \\leq 98  \\\\\n\\frac{ x^3 \\left( 160 - x \\right) }{100},   & \\text{if } x > 98  \\\\\n\\end{cases}';
      case 6:
        return '\\begin{cases}\n\\frac{ x^3 \\left( 24 + \\left\\lfloor \\frac{x+1}{3} \\right\\rfloor \\right) }{50},  & \\text{if } x \\leq 15  \\\\\n\\frac{ x^3 \\left( 14 + x \\right) }{50},     & \\text{if } 15 < x \\leq 35  \\\\\n\\frac{ x^3 \\left( 32 + \\left\\lfloor \\frac{x}{2} \\right\\rfloor \\right ) }{50},   & \\text{if } x > 35  \\\\\n\\end{cases}';
      default:
        return 'Unknown';  // Pour gérer les cas où la génération n'est pas reconnue
    }
  }
  
}
