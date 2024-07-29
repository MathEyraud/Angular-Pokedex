/**
 * Représente les détails spécifiques d'une évolution de Pokémon.
 */
export class EvolutionDetails {

    constructor(
        public minLevel             : number | null,    // Niveau minimum requis pour l'évolution
        public item                 : string | null,    // Item nécessaire pour l'évolution
        public trigger              : string,           // Déclencheur de l'évolution (ex: "level-up", "trade", etc.)
        public gender               : string | null,    // Genre spécifique requis pour l'évolution
        public heldItem             : string | null,    // Item que le Pokémon doit tenir pour évoluer
        public knownMove            : string | null,    // Mouvement que le Pokémon doit connaître
        public knownMoveType        : string | null,    // Type de mouvement que le Pokémon doit connaître
        public location             : string | null,    // Lieu spécifique où l'évolution doit se produire
        public minAffection         : number | null,    // Niveau d'affection minimum requis
        public minBeauty            : number | null,    // Niveau de beauté minimum requis
        public minHappiness         : number | null,    // Niveau de bonheur minimum requis
        public needsOverworldRain   : boolean,          // Si l'évolution nécessite qu'il pleuve dans le monde
        public partySpecies         : string | null,    // Espèce spécifique qui doit être dans l'équipe
        public partyType            : string | null,    // Type de Pokémon qui doit être dans l'équipe
        public relativePhysicalStats: number | null,    // Statistiques physiques relatives requises
        public timeOfDay            : string,           // Moment de la journée requis pour l'évolution
        public tradeSpecies         : string | null,    // Espèce spécifique contre laquelle échanger
        public turnUpsideDown       : boolean           // Si l'appareil doit être retourné pour l'évolution
    ) {}
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