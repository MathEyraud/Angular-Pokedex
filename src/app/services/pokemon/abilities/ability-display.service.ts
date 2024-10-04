import { Injectable } from '@angular/core';
import { Ability } from 'src/app/models/pokemon/abilities/ability';
import { VerboseEffect } from 'src/app/models/utility/common-models/common-models';

@Injectable({
  providedIn: 'root'
})
export class AbilityDisplayService {

  private defaultLanguage = 'en';
  private fallbackLanguage = 'en';

  constructor() { }

  getAbilityDescription(ability: Ability, language: string = this.defaultLanguage): { effect: string, shortEffect: string } | null {

    const entry = this.findEntryByLanguage(ability.effectEntries, language)
      || this.findEntryByLanguage(ability.effectEntries, this.defaultLanguage)
      || this.findEntryByLanguage(ability.effectEntries, this.fallbackLanguage);

    if (!entry) {
      console.error(`No description found for ability: ${ability.name}`);
      return null;
    }

    return {
      effect: entry.effectText,
      shortEffect: entry.shortEffect
    };
  }

  private findEntryByLanguage(entries: VerboseEffect[], language: string): VerboseEffect | undefined {
    return entries.find(entry => entry.languageResource.name === language);
  }

  getAbilityName(ability: Ability, language: string = this.defaultLanguage): string {
    const name = ability.names.find(n => n.languageRessource.name === language)
      || ability.names.find(n => n.languageRessource.name === this.defaultLanguage)
      || ability.names.find(n => n.languageRessource.name === this.fallbackLanguage);

      return name?.name || ability.formattedName;
  }

  setDefaultLanguage(language: string) {
    this.defaultLanguage = language;
  }

  setFallbackLanguage(language: string) {
    this.fallbackLanguage = language;
  }
}