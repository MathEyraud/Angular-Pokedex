import { NamedAPIResource } from "../utility/common-models/common-models";

/**
 * Représente les détails spécifiques d'une évolution de Pokémon.
 */
export class EvolutionDetail {

    constructor(
        private _item                 : NamedAPIResource | null,    // Item nécessaire pour l'évolution
        private _trigger              : NamedAPIResource | null,    // Déclencheur de l'évolution (ex: "level-up", "trade", etc.)
        private _gender               : number | null,              // Genre spécifique requis pour l'évolution
        private _heldItem             : NamedAPIResource | null,    // Item que le Pokémon doit tenir pour évoluer
        private _knownMove            : NamedAPIResource | null,    // Mouvement que le Pokémon doit connaître
        private _knownMoveType        : NamedAPIResource | null,    // Type de mouvement que le Pokémon doit connaître
        private _location             : NamedAPIResource | null,    // Lieu spécifique où l'évolution doit se produire
        private _minLevel             : number | null,              // Niveau minimum requis pour l'évolution
        private _minHappiness         : number | null,              // Niveau de bonheur minimum requis
        private _minBeauty            : number | null,              // Niveau de beauté minimum requis
        private _minAffection         : number | null,              // Niveau d'affection minimum requis
        private _needsOverworldRain   : boolean,                    // Si l'évolution nécessite qu'il pleuve dans le monde
        private _partySpecies         : NamedAPIResource | null,    // Espèce spécifique qui doit être dans l'équipe
        private _partyType            : NamedAPIResource | null,    // Type de Pokémon qui doit être dans l'équipe
        private _relativePhysicalStats: number | null,              // Statistiques physiques relatives requises
        private _timeOfDay            : string | null,              // Moment de la journée requis pour l'évolution
        private _tradeSpecies         : NamedAPIResource | null,    // Espèce spécifique contre laquelle échanger
        private _turnUpsideDown       : boolean                     // Si l'appareil doit être retourné pour l'évolution
    ) {}

    // Getter et Setter pour minLevel
    get minLevel(): number | null { return this._minLevel; }
    set minLevel(value: number | null) { this._minLevel = value; }

    // Getter et Setter pour item
    get item(): NamedAPIResource | null { return this._item; }
    set item(value: NamedAPIResource | null) { this._item = value; }

    // Getter et Setter pour trigger
    get trigger(): NamedAPIResource | null { return this._trigger; }
    set trigger(value: NamedAPIResource | null) { this._trigger = value; }

    // Getter et Setter pour gender
    get gender(): number | null { return this._gender; }
    set gender(value: number | null) { this._gender = value; }

    // Getter et Setter pour heldItem
    get heldItem(): NamedAPIResource | null { return this._heldItem; }
    set heldItem(value: NamedAPIResource | null) { this._heldItem = value; }

    // Getter et Setter pour knownMove
    get knownMove(): NamedAPIResource | null { return this._knownMove; }
    set knownMove(value: NamedAPIResource | null) { this._knownMove = value; }

    // Getter et Setter pour knownMoveType
    get knownMoveType(): NamedAPIResource | null { return this._knownMoveType; }
    set knownMoveType(value: NamedAPIResource | null) { this._knownMoveType = value; }

    // Getter et Setter pour location
    get location(): NamedAPIResource | null { return this._location; }
    set location(value: NamedAPIResource | null) { this._location = value; }

    // Getter et Setter pour minAffection
    get minAffection(): number | null { return this._minAffection; }
    set minAffection(value: number | null) { this._minAffection = value; }

    // Getter et Setter pour minBeauty
    get minBeauty(): number | null { return this._minBeauty; }
    set minBeauty(value: number | null) { this._minBeauty = value; }

    // Getter et Setter pour minHappiness
    get minHappiness(): number | null { return this._minHappiness; }
    set minHappiness(value: number | null) { this._minHappiness = value; }

    // Getter et Setter pour needsOverworldRain
    get needsOverworldRain(): boolean { return this._needsOverworldRain; }
    set needsOverworldRain(value: boolean) { this._needsOverworldRain = value; }

    // Getter et Setter pour partySpecies
    get partySpecies(): NamedAPIResource | null { return this._partySpecies; }
    set partySpecies(value: NamedAPIResource | null) { this._partySpecies = value; }

    // Getter et Setter pour partyType
    get partyType(): NamedAPIResource | null { return this._partyType; }
    set partyType(value: NamedAPIResource | null) { this._partyType = value; }

    // Getter et Setter pour relativePhysicalStats
    get relativePhysicalStats(): number | null { return this._relativePhysicalStats; }
    set relativePhysicalStats(value: number | null) { this._relativePhysicalStats = value; }

    // Getter et Setter pour timeOfDay
    get timeOfDay(): string | null { return this._timeOfDay; }
    set timeOfDay(value: string | null) { this._timeOfDay = value; }

    // Getter et Setter pour tradeSpecies
    get tradeSpecies(): NamedAPIResource | null { return this._tradeSpecies; }
    set tradeSpecies(value: NamedAPIResource | null) { this._tradeSpecies = value; }

    // Getter et Setter pour turnUpsideDown
    get turnUpsideDown(): boolean { return this._turnUpsideDown; }
    set turnUpsideDown(value: boolean) { this._turnUpsideDown = value; }
}