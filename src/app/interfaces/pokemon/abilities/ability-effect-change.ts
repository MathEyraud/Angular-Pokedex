import { IEffect, INamedAPIResource } from "../../utility/common-models/common-models";

export interface IAbilityEffectChange {
    effect_entries: IEffect[];
    version_group: INamedAPIResource;
}