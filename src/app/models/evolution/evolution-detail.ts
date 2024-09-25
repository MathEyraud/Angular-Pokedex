import { NamedAPIResource } from "../utility/common-models/common-models";

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

    /**
     * Méthode qui retourne toutes les informations lié à l'évolution.
     * Sous forme de tableau.
    */
    // TODO : DONNER UN NOM ANGLAIS
    getEvolutionCriteria(): string[] {

        const criteria: string[] = [];
    
        if (this.minLevel) criteria.push(`Level ${this.minLevel}`);
        if (this.item) criteria.push(`Use ${this.item.name}`);
        if (this.minHappiness) criteria.push(`Happiness ≥ ${this.minHappiness}`);
        if (this.minBeauty) criteria.push(`Beauty ≥ ${this.minBeauty}`);
        if (this.minAffection) criteria.push(`Affection ≥ ${this.minAffection}`);
        if (this.gender !== null) criteria.push(`Gender: ${this.gender === 1 ? 'Female' : 'Male'}`);
        if (this.heldItem) criteria.push(`Hold ${this.heldItem.name}`);
        if (this.knownMove) criteria.push(`Know ${this.knownMove.name}`);
        if (this.knownMoveType) criteria.push(`Know a move of type ${this.knownMoveType.name}`);
        if (this.location) criteria.push(`At ${this.location.name}`);
        if (this.needsOverworldRain) criteria.push('While raining');
        if (this.partySpecies) criteria.push(`With ${this.partySpecies.name} in party`);
        if (this.partyType) criteria.push(`With a Pokémon of type ${this.partyType.name} in party`);
        if (this.relativePhysicalStats !== null) {
            if (this.relativePhysicalStats === 1) criteria.push('Attack > Defense');
            if (this.relativePhysicalStats === 0) criteria.push('Attack = Defense');
            if (this.relativePhysicalStats === -1) criteria.push('Attack < Defense');
        }
        if (this.timeOfDay) criteria.push(`During the ${this.timeOfDay === 'day' ? 'day' : 'night'}`);
        if (this.tradeSpecies) criteria.push(`Trade for ${this.tradeSpecies.name}`);
        if (this.turnUpsideDown) criteria.push('Turn console upside down');
    
        return criteria.length > 0 ? criteria : [];
    }
    
    // VERSION FR
    // getEvolutionMethods(): string[] {

    //     const criteria: string[] = [];
    
    //     if (this.minLevel) criteria.push(`Niveau ${this.minLevel}`);
    //     if (this.item) criteria.push(`Utiliser ${this.item.name}`);
    //     if (this.trigger?.name === 'trade') criteria.push('Échange');
    //     if (this.minHappiness) criteria.push(`Bonheur ≥ ${this.minHappiness}`);
    //     if (this.minBeauty) criteria.push(`Beauté ≥ ${this.minBeauty}`);
    //     if (this.minAffection) criteria.push(`Affection ≥ ${this.minAffection}`);
    //     if (this.gender !== null) criteria.push(`Genre: ${this.gender === 1 ? 'Femelle' : 'Mâle'}`);
    //     if (this.heldItem) criteria.push(`Tenir ${this.heldItem.name}`);
    //     if (this.knownMove) criteria.push(`Connaître ${this.knownMove.name}`);
    //     if (this.knownMoveType) criteria.push(`Connaître une attaque ${this.knownMoveType.name}`);
    //     if (this.location) criteria.push(`À ${this.location.name}`);
    //     if (this.needsOverworldRain) criteria.push('Sous la pluie');
    //     if (this.partySpecies) criteria.push(`Avec ${this.partySpecies.name} dans l'équipe`);
    //     if (this.partyType) criteria.push(`Avec un Pokémon de type ${this.partyType.name} dans l'équipe`);
    //     if (this.relativePhysicalStats !== null) {
    //         if (this.relativePhysicalStats === 1) criteria.push('Attaque > Défense');
    //         if (this.relativePhysicalStats === 0) criteria.push('Attaque = Défense');
    //         if (this.relativePhysicalStats === -1) criteria.push('Attaque < Défense');
    //     }
    //     if (this.timeOfDay) criteria.push(`Pendant la ${this.timeOfDay === 'day' ? 'journée' : 'nuit'}`);
    //     if (this.tradeSpecies) criteria.push(`Échange contre ${this.tradeSpecies.name}`);
    //     if (this.turnUpsideDown) criteria.push('Console retournée');
    
    //     return criteria.length > 0 ? criteria : [];
    // }

    // TODO : DONNER UN NOM AUX TRIGGERS
    get evolutionTrigger(): string {
    
        if (this.trigger?.name === 'level-up') return 'level-up';
        if (this.trigger?.name === 'trade') return 'trade';
        if (this.trigger?.name === 'use-item') return 'use-item';
        if (this.trigger?.name === 'shed') return 'shed';
        if (this.trigger?.name === 'spin') return 'spin';
        if (this.trigger?.name === 'tower-of-darkness') return 'tower-of-darkness';
        if (this.trigger?.name === 'tower-of-waters') return 'tower-of-waters';
        if (this.trigger?.name === 'three-critical-hits') return 'three-critical-hits';
        if (this.trigger?.name === 'take-damage') return 'take-damage';
        if (this.trigger?.name === 'other') return 'other';
        if (this.trigger?.name === 'agile-style-move') return 'agile-style-move';
        if (this.trigger?.name === 'strong-style-move') return 'strong-style-move';
        if (this.trigger?.name === 'recoil-damage') return 'recoil-damage';
    
        return '';
    }

    getEvolutionDescription(): string {
        let description = '';
        const conditions: string[] = [];
    
        switch (this.evolutionTrigger) {
            case 'level-up':
                if (this.minLevel) {
                    description = `Level ${this.minLevel}`;
                } else {
                    description = 'Level up';
                }
                break;
            case 'trade':
                description = 'Trade';
                break;
            case 'use-item':
                description = this.item ? `Use ${this.item.name}` : 'Use item';
                break;
            case 'shed':
                return 'Shed (special)';
            case 'spin':
                return 'Spin (special)';
            case 'tower-of-darkness':
                return 'Tower of Darkness (special)';
            case 'tower-of-waters':
                return 'Tower of Waters (special)';
            case 'three-critical-hits':
                return '3 critical hits in battle';
            case 'take-damage':
                return 'Take damage in battle';
            case 'agile-style-move':
                return 'Use Agile Style moves';
            case 'strong-style-move':
                return 'Use Strong Style moves';
            case 'recoil-damage':
                return 'Take recoil damage';
            case 'other':
                return 'Special method';
            default:
                return 'Unknown method';
        }
    
        if (this.location) conditions.push(`at ${this.location.name}`);
        if (this.heldItem) conditions.push(`hold ${this.heldItem.name}`);
        if (this.tradeSpecies) conditions.push(`for ${this.tradeSpecies.name}`);
        if (this.minHappiness) conditions.push(`happiness ≥ ${this.minHappiness}`);
        if (this.minBeauty) conditions.push(`beauty ≥ ${this.minBeauty}`);
        if (this.minAffection) conditions.push(`affection ≥ ${this.minAffection}`);
        if (this.gender !== null) conditions.push(this.gender === 1 ? 'female' : 'male');
        if (this.knownMove) conditions.push(`know ${this.knownMove.name}`);
        if (this.knownMoveType) conditions.push(`know ${this.knownMoveType.name} move`);
        if (this.needsOverworldRain) conditions.push('while raining');
        if (this.partySpecies) conditions.push(`with ${this.partySpecies.name} in party`);
        if (this.partyType) conditions.push(`with ${this.partyType.name} type in party`);
        if (this.relativePhysicalStats !== null) {
            conditions.push(this.relativePhysicalStats === 1 ? 'ATK > DEF' : 
                            this.relativePhysicalStats === -1 ? 'ATK < DEF' : 'ATK = DEF');
        }
        if (this.timeOfDay) conditions.push(this.timeOfDay);
        if (this.turnUpsideDown) conditions.push('turn console upside down');
    
        if (conditions.length > 0) {
            description += ` (${conditions.join(', ')})`;
        }
    
        return description;
    }
}