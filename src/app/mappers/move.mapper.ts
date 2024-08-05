import { IPokemonMove } from "../interfaces/move-pokemon";
import { PokemonMove } from "../models/move-pokemon";
import { AbilityEffectChange, ContestComboDetail, ContestComboSets, MachineVersionDetail, MoveFlavorText, MoveMetaData, Moves, MoveStatChange, Name, PastMoveStatValues, VerboseEffect } from "../models/moves/moves";
import { IMoves, IContestComboSets, IVerboseEffect, IAbilityEffectChange, IMoveFlavorText, IMachineVersionDetail, IMoveMetaData, IName, IPastMoveStatValues, IMoveStatChange, IContestComboDetail } from "../interfaces/moves";
import { IAPIResource, INamedAPIResource } from "../interfaces/api-ressource";
import { APIResource, NamedAPIResource } from "../models/api-ressource";
import { ApiRessourceMapper } from "./api-ressource";

export class MoveMapper {

  static mapToMoves(apiData: IMoves): Moves {

    return new Moves(
      apiData.id,                      
      apiData.name,
      apiData.accuracy,
      apiData.effect_chance,
      apiData.pp,
      apiData.priority,
      apiData.power,
      MoveMapper.mapContestCombos(apiData.contest_combos),
      MoveMapper.mapContestType(apiData.contest_type),
      MoveMapper.mapContestEffect(apiData.contest_effect),
      MoveMapper.mapDamageClass(apiData.damage_class),
      MoveMapper.mapEffectEntries(apiData.effect_entries),
      MoveMapper.mapEffectChanges(apiData.effect_changes),
      MoveMapper.mapLearnedByPokemon(apiData.learned_by_pokemon),
      MoveMapper.mapFlavorTextEntries(apiData.flavor_text_entries),
      MoveMapper.mapGeneration(apiData.generation),
      MoveMapper.mapMachines(apiData.machines),
      MoveMapper.mapMeta(apiData.meta),
      MoveMapper.mapNames(apiData.names),
      MoveMapper.mapPastValues(apiData.past_values),
      MoveMapper.mapStatChanges(apiData.stat_changes),
      MoveMapper.mapSuperContestEffect(apiData.super_contest_effect),
      MoveMapper.mapTarget(apiData.target),
      MoveMapper.mapType(apiData.type)
    );
  }

  static getMove(move: IPokemonMove): PokemonMove {
    return new PokemonMove(move);
  }

  static getMoves(data: IPokemonMove[]): PokemonMove[] {
    return data.map(MoveMapper.getMove);
  }

  // Mappers individuels pour chaque attribut
  static mapContestCombos(contestCombos: IContestComboSets | null): ContestComboSets | null {
    return contestCombos ? new ContestComboSets(
      MoveMapper.mapContestComboDetail(contestCombos.normal),
      MoveMapper.mapContestComboDetail(contestCombos.super),
    ) : null;
  }

  static mapContestComboDetail(detail: IContestComboDetail | null): ContestComboDetail | null {
    return detail ? new ContestComboDetail(
      detail?.use_before?.map(ApiRessourceMapper.mapToNamedAPIResource) || null,
      detail?.use_after?.map(ApiRessourceMapper.mapToNamedAPIResource) || null,
    ) : null;
  }

  static mapContestType(contestType: INamedAPIResource | null): NamedAPIResource | null {
    return contestType ? new NamedAPIResource(
      contestType.name,
      contestType.url,
    ) : null;
  }

  static mapContestEffect(contestEffect: IAPIResource | null): APIResource | null {
    return contestEffect ? new APIResource(
      contestEffect.url,
    ) : null;
  }

  static mapDamageClass(damageClass: INamedAPIResource): NamedAPIResource {
    return new NamedAPIResource(
      damageClass.name,
      damageClass.url,
    );
  }

  static mapEffectEntries(effectEntries: IVerboseEffect[]): VerboseEffect[] {
    return effectEntries.map(entry => new VerboseEffect(
      entry.effect,
      entry.short_effect,
      ApiRessourceMapper.mapToNamedAPIResource(entry.language)
    ));
  }

  static mapEffectChanges(effectChanges: IAbilityEffectChange[]): AbilityEffectChange[] {
    return effectChanges.map(change => new AbilityEffectChange(
      MoveMapper.mapEffectEntries(change.effect_entries),
      ApiRessourceMapper.mapToNamedAPIResource(change.version_group)
    ));
  }

  static mapLearnedByPokemon(learnedByPokemon: INamedAPIResource[]): NamedAPIResource[] {
    return learnedByPokemon.map(ApiRessourceMapper.mapToNamedAPIResource);
  }

  static mapFlavorTextEntries(flavorTextEntries: IMoveFlavorText[]): MoveFlavorText[] {
    return flavorTextEntries.map(entry => new MoveFlavorText(
      entry.flavor_text,
      ApiRessourceMapper.mapToNamedAPIResource(entry.language),
      ApiRessourceMapper.mapToNamedAPIResource(entry.version_group)
    ));
  }

  static mapGeneration(generation: INamedAPIResource): NamedAPIResource {
    return new NamedAPIResource(
      generation.name,
      generation.url,
    );
  }

  static mapMachines(machines: IMachineVersionDetail[]): MachineVersionDetail[] {
    return machines.map(machine => new MachineVersionDetail(
      ApiRessourceMapper.mapToAPIResource(machine.machine),
      ApiRessourceMapper.mapToNamedAPIResource(machine.version_group)
    ));
  }

  static mapMeta(meta: IMoveMetaData | null): MoveMetaData | null {

    return meta ? new MoveMetaData(
      ApiRessourceMapper.mapToNamedAPIResource(meta.ailment),
      ApiRessourceMapper.mapToNamedAPIResource(meta.category),
      meta.min_hits,
      meta.max_hits,
      meta.min_turns,
      meta.max_turns,
      meta.drain,
      meta.healing,
      meta.crit_rate,
      meta.ailment_chance,
      meta.flinch_chance,
      meta.stat_chance,
    ) : null;
  }

  static mapNames(names: IName[]): Name[] {
    return names.map(name => new Name(
      name.name,
      ApiRessourceMapper.mapToNamedAPIResource(name.language)
    ));
  }

  static mapPastValues(pastValues: IPastMoveStatValues[] | null): PastMoveStatValues[] | null {
    return pastValues? pastValues.map(value => new PastMoveStatValues(
      value.accuracy,
      value.effect_chance,
      value.power,
      value.pp,
      MoveMapper.mapEffectEntries(value.effect_entries),
      value.type ? ApiRessourceMapper.mapToNamedAPIResource(value.type) : null,
      ApiRessourceMapper.mapToNamedAPIResource(value.version_group)
    )) : null;
  }

  static mapStatChanges(statChanges: IMoveStatChange[]): MoveStatChange[] {
    return statChanges.map(change => new MoveStatChange(
      change.change,
      ApiRessourceMapper.mapToNamedAPIResource(change.stat)
    ));
  }

  static mapSuperContestEffect(superContestEffect: IAPIResource | null): APIResource | null {
    return superContestEffect ? new APIResource(superContestEffect.url) : null;
  }

  static mapTarget(target: INamedAPIResource): NamedAPIResource {
    return new NamedAPIResource(
      target.name,
      target.url,
    );  
  }

  static mapType(type: INamedAPIResource): NamedAPIResource {
    return new NamedAPIResource(
      type.name,
      type.url,
    );
  }

}