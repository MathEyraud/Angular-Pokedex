import { IAPIResource, IName, INamedAPIResource, IVerboseEffect } from "./utility/common-models/common-models";

// Interface définissant la structure de la réponse de l'API des attaques
export interface IMoveApiResponse {
    count   : number;           // Nombre total d'attaques
    next    : string | null;    // URL pour la page suivante de résultats
    previous: string | null;    // URL pour la page précédente de résultats
    results : INamedAPIResource[]; // Liste des attaques avec leur nom et URL
}

export interface IMoves {
    id                      : number;
    name                    : string;
    accuracy                : number | null;
    effect_chance           : number | null;
    pp                      : number;
    priority                : number;
    power                   : number | null;
    contest_combos          : IContestComboSets | null;
    contest_type            : INamedAPIResource | null;
    contest_effect          : IAPIResource | null;
    damage_class            : INamedAPIResource;
    effect_entries          : IVerboseEffect[];
    effect_changes          : IAbilityEffectChange[];
    learned_by_pokemon      : INamedAPIResource[];
    flavor_text_entries     : IMoveFlavorText[];
    generation              : INamedAPIResource;
    machines                : IMachineVersionDetail[];
    meta                    : IMoveMetaData | null;
    names                   : IName[];
    past_values             : IPastMoveStatValues[] | null;
    stat_changes            : IMoveStatChange[];
    super_contest_effect    : IAPIResource;
    target                  : INamedAPIResource;
    type                    : INamedAPIResource;
}

export interface IContestComboSets {
    normal: IContestComboDetail | null;
    super: IContestComboDetail | null;
}

export interface IContestComboDetail {
    use_before: INamedAPIResource[] | null;
    use_after: INamedAPIResource[] | null;
}

export interface IAbilityEffectChange {
    effect_entries: IVerboseEffect[];
    version_group: INamedAPIResource;
}

export interface IMoveFlavorText {
    flavor_text: string;
    language: INamedAPIResource;
    version_group: INamedAPIResource;
}

export interface IMoveMetaData {
    ailment: INamedAPIResource;
    category: INamedAPIResource;
    min_hits: number | null;
    max_hits: number | null;
    min_turns: number | null;
    max_turns: number | null;
    drain: number;
    healing: number;
    crit_rate: number;
    ailment_chance: number;
    flinch_chance: number;
    stat_chance: number;
}

export interface IMoveStatChange {
    change: number;
    stat: INamedAPIResource;
}

export interface IPastMoveStatValues {
    accuracy: number | null;
    effect_chance: number | null;
    power: number | null;
    pp: number | null;
    effect_entries: IVerboseEffect[];
    type: INamedAPIResource | null;
    version_group: INamedAPIResource;
}

export interface IMachineVersionDetail {
    machine: IAPIResource;
    version_group: INamedAPIResource;
}