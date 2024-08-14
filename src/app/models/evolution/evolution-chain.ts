/**
 * Représente la chaîne d'évolution complète d'un Pokémon.
 */
export class EvolutionChain {

    private _currentForm: Evolution;

    constructor(evolutionData: any) {
        this._currentForm = this.parseEvolutionChain(evolutionData.chain);
    }

    /**
     * Parse récursivement les données de la chaîne d'évolution.
     */
    private parseEvolutionChain(chain: any): Evolution {

        //
        const name = chain.species.name;

        //
        const details = chain.evolution_details.length > 0 
            ? this.parseEvolutionDetails(chain.evolution_details[0])
            : new EvolutionDetails(null, null, "level-up", null, null, null, null, null, null, null, null, false, null, null, null, "", null, false);

        //
        const evolution = new Evolution(name, details);

        if (chain.evolves_to && chain.evolves_to.length > 0) {
            chain.evolves_to.forEach((nextChain: any) => {
                const nextEvolution = this.parseEvolutionChain(nextChain);
                evolution.addNextEvolution(nextEvolution);
            });
        }

        return evolution;
    }
    
    /**
     * Parse les détails d'une évolution spécifique.
     */
    private parseEvolutionDetails(details: any): EvolutionDetails {
        return new EvolutionDetails(
            details.min_level,
            details.item?.name,
            details.trigger.name,
            details.gender,
            details.held_item?.name,
            details.known_move?.name,
            details.known_move_type?.name,
            details.location?.name,
            details.min_affection,
            details.min_beauty,
            details.min_happiness,
            details.needs_overworld_rain,
            details.party_species?.name,
            details.party_type?.name,
            details.relative_physical_stats,
            details.time_of_day,
            details.trade_species?.name,
            details.turn_upside_down
        );
    }

    /**
     * Retourne la forme actuelle dans la chaîne d'évolution.
     */
    get currentForm(): Evolution {
        return this._currentForm;
    }

    /**
     * Retourne toutes les évolutions dans la chaîne sous forme de tableau.
     */
    getAllEvolutions(): { name: string; details: EvolutionDetails }[] {
        
        const evolutions: { name: string; details: EvolutionDetails }[] = [];
        
        const traverse = (evolution: Evolution) => {
            evolutions.push({ name: evolution.name, details: evolution.details });
            evolution.nextEvolutions.forEach(nextEvo => traverse(nextEvo));
        };
    
        traverse(this._currentForm);
        return evolutions;
    }
}

/**
 * Représente les détails spécifiques d'une évolution de Pokémon.
 */
export class EvolutionDetails {

    constructor(
        private _minLevel             : number | null,    // Niveau minimum requis pour l'évolution
        private _item                 : string | null,    // Item nécessaire pour l'évolution
        private _trigger              : string | null,    // Déclencheur de l'évolution (ex: "level-up", "trade", etc.)
        private _gender               : string | null,    // Genre spécifique requis pour l'évolution
        private _heldItem             : string | null,    // Item que le Pokémon doit tenir pour évoluer
        private _knownMove            : string | null,    // Mouvement que le Pokémon doit connaître
        private _knownMoveType        : string | null,    // Type de mouvement que le Pokémon doit connaître
        private _location             : string | null,    // Lieu spécifique où l'évolution doit se produire
        private _minAffection         : number | null,    // Niveau d'affection minimum requis
        private _minBeauty            : number | null,    // Niveau de beauté minimum requis
        private _minHappiness         : number | null,    // Niveau de bonheur minimum requis
        private _needsOverworldRain   : boolean,          // Si l'évolution nécessite qu'il pleuve dans le monde
        private _partySpecies         : string | null,    // Espèce spécifique qui doit être dans l'équipe
        private _partyType            : string | null,    // Type de Pokémon qui doit être dans l'équipe
        private _relativePhysicalStats: number | null,    // Statistiques physiques relatives requises
        private _timeOfDay            : string | null,    // Moment de la journée requis pour l'évolution
        private _tradeSpecies         : string | null,    // Espèce spécifique contre laquelle échanger
        private _turnUpsideDown       : boolean           // Si l'appareil doit être retourné pour l'évolution
    ) {}

    // Getter et Setter pour minLevel
    get minLevel(): number | null { return this._minLevel; }
    set minLevel(value: number | null) { this._minLevel = value; }

    // Getter et Setter pour item
    get item(): string | null { return this._item; }
    set item(value: string | null) { this._item = value; }

    // Getter et Setter pour trigger
    get trigger(): string | null { return this._trigger; }
    set trigger(value: string | null) { this._trigger = value; }

    // Getter et Setter pour gender
    get gender(): string | null { return this._gender; }
    set gender(value: string | null) { this._gender = value; }

    // Getter et Setter pour heldItem
    get heldItem(): string | null { return this._heldItem; }
    set heldItem(value: string | null) { this._heldItem = value; }

    // Getter et Setter pour knownMove
    get knownMove(): string | null { return this._knownMove; }
    set knownMove(value: string | null) { this._knownMove = value; }

    // Getter et Setter pour knownMoveType
    get knownMoveType(): string | null { return this._knownMoveType; }
    set knownMoveType(value: string | null) { this._knownMoveType = value; }

    // Getter et Setter pour location
    get location(): string | null { return this._location; }
    set location(value: string | null) { this._location = value; }

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
    get partySpecies(): string | null { return this._partySpecies; }
    set partySpecies(value: string | null) { this._partySpecies = value; }

    // Getter et Setter pour partyType
    get partyType(): string | null { return this._partyType; }
    set partyType(value: string | null) { this._partyType = value; }

    // Getter et Setter pour relativePhysicalStats
    get relativePhysicalStats(): number | null { return this._relativePhysicalStats; }
    set relativePhysicalStats(value: number | null) { this._relativePhysicalStats = value; }

    // Getter et Setter pour timeOfDay
    get timeOfDay(): string | null { return this._timeOfDay; }
    set timeOfDay(value: string | null) { this._timeOfDay = value; }

    // Getter et Setter pour tradeSpecies
    get tradeSpecies(): string | null { return this._tradeSpecies; }
    set tradeSpecies(value: string | null) { this._tradeSpecies = value; }

    // Getter et Setter pour turnUpsideDown
    get turnUpsideDown(): boolean { return this._turnUpsideDown; }
    set turnUpsideDown(value: boolean) { this._turnUpsideDown = value; }
}

/**
 * Représente une étape d'évolution d'un Pokémon.
 */
export class Evolution {

    constructor(
        private _name           : string,           // Nom de cette forme d'évolution
        private _details        : EvolutionDetails, // Détails de l'évolution vers cette forme
        private _nextEvolutions : Evolution[] = [], // Prochaines évolutions, s'il y en a
    ) {}

    // ---------------------------------------- //
    // ----- Getters et setters classique ----- //
    // ---------------------------------------- //
    get name()                  : string { return this._name; }
    get details()               : EvolutionDetails { return this._details; }
    get nextEvolutions()        : Evolution[] { return this._nextEvolutions; }
    addNextEvolution(evolution  : Evolution) { this._nextEvolutions.push(evolution); }
}