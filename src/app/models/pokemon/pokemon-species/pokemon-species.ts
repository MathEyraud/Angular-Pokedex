import { capitalizeFirstLetter } from "src/app/utils/string-utils";
import { APIResource, Description, FlavorText, Name, NamedAPIResource } from "../../utility/common-models/common-models";
import { Genus } from "./genus";
import { PalParkEncounterArea } from "./pal-park-encounter-area";
import { PokemonSpeciesDexEntry } from "./pokemon-species-dex-entry";
import { PokemonSpeciesVariety } from "./pokemon-species-variety";

export class PokemonSpecies {

  constructor(
    private _base_happiness: number,
    private _capture_rate: number,
    private _color: NamedAPIResource,
    private _egg_groups: NamedAPIResource[],
    private _evolution_chain: APIResource,
    private _evolves_from_species: NamedAPIResource | null,
    private _flavor_text_entries: FlavorText[],
    private _form_descriptions: Description[],
    private _forms_switchable: boolean,
    private _gender_rate: number,
    private _genera: Genus[],
    private _generation: NamedAPIResource,
    private _growth_rate: NamedAPIResource,
    private _habitat: NamedAPIResource | null,
    private _has_gender_differences: boolean,
    private _hatch_counter: number,
    private _id: number,
    private _is_baby: boolean,
    private _is_legendary: boolean,
    private _is_mythical: boolean,
    private _name: string,
    private _names: Name[],
    private _order: number,
    private _pal_park_encounters: PalParkEncounterArea[],
    private _pokedex_numbers: PokemonSpeciesDexEntry[],
    private _shape: NamedAPIResource | null,
    private _varieties: PokemonSpeciesVariety[]
  ) {}

  // ---------------------------------------- //
  // ----- Getters et setters classique ----- //
  // ---------------------------------------- //
  
  // Getter and setter for baseHappiness
  get baseHappiness() : number { return this._base_happiness; }
  set baseHappiness(value: number) { this._base_happiness = value; }

  // Getter and setter for captureRate
  get captureRate() : number { return this._capture_rate; }
  set captureRate(value: number) { this._capture_rate = value; }

  // Getter and setter for color
  get colorRessource() : NamedAPIResource { return this._color; }
  set colorRessource(value: NamedAPIResource) { this._color = value; }

  // Getter and setter for eggGroups
  get eggGroupsRessource() : NamedAPIResource[] { return this._egg_groups; }
  set eggGroupsRessource(value: NamedAPIResource[]) { this._egg_groups = value; }

  // Getter and setter for evolutionChain
  get evolutionChainRessource() : APIResource { return this._evolution_chain; }
  set evolutionChainRessource(value: APIResource) { this._evolution_chain = value; }

  // Getter and setter for evolvesFromSpecies
  get evolvesFromSpeciesRessource() : NamedAPIResource | null { return this._evolves_from_species; }
  set evolvesFromSpeciesRessource(value: NamedAPIResource | null) { this._evolves_from_species = value; }

  // Getter and setter for flavorTextEntries
  get flavorTextEntries() : FlavorText[] { return this._flavor_text_entries; }
  set flavorTextEntries(value: FlavorText[]) { this._flavor_text_entries = value; }

  // Getter and setter for formDescriptions
  get formDescriptions() : Description[] { return this._form_descriptions; }
  set formDescriptions(value: Description[]) { this._form_descriptions = value; }

  // Getter and setter for formsSwitchable
  get formsSwitchable() : boolean { return this._forms_switchable; }
  set formsSwitchable(value: boolean) { this._forms_switchable = value; }

  // Getter and setter for genderRate
  get genderRate() : number  { return this._gender_rate; }
  set genderRate(value: number) { this._gender_rate = value; }

  // Getter and setter for genera
  get genera() : Genus[] { return this._genera; }
  set genera(value: Genus[]) { this._genera = value; }

  // Getter and setter for generation
  get generationRessource() : NamedAPIResource { return this._generation; }
  set generationRessource(value: NamedAPIResource) { this._generation = value; }

  // Getter and setter for growthRate
  get growthRateRessource() : NamedAPIResource { return this._growth_rate; }
  set growthRateRessource(value: NamedAPIResource) { this._growth_rate = value; }

  // Getter and setter for habitat
  get habitatRessource() : NamedAPIResource | null { return this._habitat; }
  set habitatRessource(value: NamedAPIResource | null) { this._habitat = value; }

  // Getter and setter for hasGenderDifferences
  get hasGenderDifferences() : boolean { return this._has_gender_differences; }
  set hasGenderDifferences(value: boolean) { this._has_gender_differences = value; }

  // Getter and setter for hatchCounter
  get hatchCounter() : number  { return this._hatch_counter; }
  set hatchCounter(value: number) { this._hatch_counter = value; }

  // Getter and setter for id
  get id() : number  { return this._id; }
  set id(value: number) { this._id = value; }

  // Getter and setter for isBaby
  get isBaby() : boolean { return this._is_baby; }
  set isBaby(value: boolean) { this._is_baby = value; }

  // Getter and setter for isLegendary
  get isLegendary() : boolean { return this._is_legendary; }
  set isLegendary(value: boolean) { this._is_legendary = value; }

  // Getter and setter for isMythical
  get isMythical() : boolean { return this._is_mythical; }
  set isMythical(value: boolean) { this._is_mythical = value; }

  // Getter and setter for name
  get name() : string { return this._name; }
  set name(value: string) { this._name = value; }

  // Getter and setter for names
  get names() : Name[] { return this._names; }
  set names(value: Name[]) { this._names = value; }

  // Getter and setter for order
  get order() : number  { return this._order; }
  set order(value: number) { this._order = value; }

  // Getter and setter for palParkEncounters
  get palParkEncounters() : PalParkEncounterArea[] { return this._pal_park_encounters; }
  set palParkEncounters(value: PalParkEncounterArea[]) { this._pal_park_encounters = value; }

  // Getter and setter for pokedexNumbers
  get pokedexNumbers() : PokemonSpeciesDexEntry[] { return this._pokedex_numbers; }
  set pokedexNumbers(value: PokemonSpeciesDexEntry[]) { this._pokedex_numbers = value; }

  // Getter and setter for shape
  get shapeRessource() : NamedAPIResource | null { return this._shape; }
  set shapeRessource(value: NamedAPIResource | null) { this._shape = value; }

  // Getter and setter for varieties
  get varieties() : PokemonSpeciesVariety[] { return this._varieties; }
  set varieties(value: PokemonSpeciesVariety[]) { this._varieties = value; }

  // ---------------------------------------------- //
  // ----- Getter avec logique supplémentaire ----- //
  // ---------------------------------------------- //
  get formattedCaptureRate() : string {
    return ((this.captureRate / 255) * 100).toFixed(2) + '%'
  }

  get formattedHabitat(): string {
    return this.habitatRessource?.name  ? capitalizeFirstLetter(this.habitatRessource?.name) : 'N/A';
  }

  get percentageGenderRateMale(): number {
    return (1 - this.genderRate / 8) * 100
  }

  get formattedNamePreviousPokemon(): string | null {

    if (this._evolves_from_species?.name) {
      const newName = this._name?.replace(/-/g, ' ');
      return capitalizeFirstLetter(this._evolves_from_species?.name);
        
    } else {
      return null;
    }
    
}

  get percentageGenderRateFemale(): number {
    return (this.genderRate / 8) * 100
  }

  getEggGroupText(): string {
    if (this.eggGroups === 'No-eggs') {
      return "Egg not obtainable";
    }
    return `${this.eggGroups} (${this.hatchCounter} cycles)`;
  }


  get generationName() : string{ 
    const generationField = this.generationRessource.name;
    const generation = this.getGeneration(generationField);
    const region = this.getRegion(generation);
    return region
  }

  // Méthode pour obtenir la liste des groupes d'œufs sous forme de chaîne de caractères
  get eggGroups(): string {
    return this.eggGroupsRessource.map(eggGroup => capitalizeFirstLetter(eggGroup.name)).join(' / ');
  }

  get formattedName(): string {

    if (this._name) {
      const newName = this._name?.replace(/-/g, ' ');
      return capitalizeFirstLetter(newName);
        
    } else {
      return "N/A";
    }
    
}

  // Function to get flavor text by version and language
  getFlavorTextByVersion(versionGroup: string): string | null {

    // TODO : A MODULER AVEC UNE VARIABLE PLUS TARD
    const language = 'en';

    // Split the versionGroup string into an array of individual version names
    const versions = versionGroup.split('-');


    // Iterate through flavor_text_entries to find the matching entry
    for (let entry of this._flavor_text_entries) {
      
      if (versions.includes(entry.versionRessource.name)  && entry.languageRessource.name === language) {
        return entry.formattedFlavorText;
      }
    }
    
    // Return a default message if no matching entry is found
    return 'No description available for the selected version.';
  }

  getGenusByLanguage(): string | null {

    // TODO : A MODULER AVEC UNE VARIABLE PLUS TARD
    const language = 'en';

    // Iterate through flavor_text_entries to find the matching entry
    for (let genus of this._genera) {
      
      if (genus.languageRessource.name === language) {
        return genus.genus;
      }
    }
    
    // Return a default message if no matching entry is found
    return 'No description available for the selected version.';
  }


  getGeneration(generationField: string): string {

    if (generationField && generationField.includes('-')) {
      return generationField.split('-')[1]; // Récupère la partie après le tiret
    }
    return ''; // Retourne une chaîne vide si la validation échoue
  }

  getRegion(generation: string): string {
    switch (generation) {
      case 'i':
        return 'Kanto (1st Generation)';
      case 'ii':
        return 'Johto (2nd Generation)';
      case 'iii':
        return 'Hoenn (3rd Generation)';
      case 'iv':
        return 'Sinnoh (4th Generation)';
      case 'v':
        return 'Unova (5th Generation)';
      case 'vi':
        return 'Kalos (6th Generation)';
      case 'vii':
        return 'Alola (7th Generation)';
      case 'viii':
        return 'Galar (8th Generation)';
      case 'ix':
        return 'Paldea (9th Generation)';
      default:
        return 'Unknown';  // Pour gérer les cas où la génération n'est pas reconnue
    }
  }

  getPokemonColor(): string {
    if (this.colorRessource && this.colorRessource.name) {
      // Convertir le nom de la couleur en une valeur CSS valide
      return this.convertColorNameToCss(this.colorRessource.name);
    }
    return 'transparent'; // Couleur par défaut si aucune couleur n'est spécifiée
  }

  private convertColorNameToCss(colorName: string): string {

    const opacity = '20';

    // Mapper les noms de couleurs de l'API à des valeurs CSS
    const colorMap: { [key: string]: string } = {
      black: '#000000' + opacity,
      blue: '#0000FF' + opacity,
      brown: '#A52A2A' + opacity,
      gray: '#808080' + opacity,
      green: '#008000' + opacity,
      pink: '#FFC0CB' + opacity,
      purple: '#800080' + opacity,
      red: '#FF0000'+ opacity,
      white: '#FFFFFF'+ opacity,
      yellow: '#FFFF00'+ opacity,
    };

    return colorMap[colorName.toLowerCase()] || colorName;
  }

}