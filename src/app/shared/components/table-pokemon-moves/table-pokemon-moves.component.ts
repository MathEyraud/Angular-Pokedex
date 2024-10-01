import { Component, Input, SimpleChanges } from '@angular/core';
import { Moves } from 'src/app/models/moves/moves/moves';
import { PokemonMove, PokemonMoveVersion } from 'src/app/models/pokemon/pokemon/pokemon-move';
import { VerboseEffect } from 'src/app/models/utility/common-models/common-models';

@Component({
  selector: 'app-table-pokemon-moves',
  templateUrl: './table-pokemon-moves.component.html',
  styleUrls: ['./table-pokemon-moves.component.css']
})
export class TablePokemonMovesComponent {

  @Input() moves                : PokemonMove[] = [];
  @Input() moveDetailsByMoveMap : Map<PokemonMove, Moves> = new Map();
  @Input() selectedVersion      : string = '';
  @Input() isLevelUpMode        : boolean = false;

  getFilteredVersions(move: PokemonMove): PokemonMoveVersion[] {
    return move.versions.filter(version => version.version_group.name === this.selectedVersion);
  }

  formatAccuracy(accuracy: number | null | undefined): string {
    if (accuracy === null || accuracy === undefined) return '--';
    if (accuracy === 0) return '0%';
    return `${accuracy}%`;
  }

  formatPower(power: number | null | undefined): string {
    if (power === null || power === undefined) return '--';
    if (power === 0) return '--';
    return `${power}`;
  }

  displayDescription(description: VerboseEffect, size: string): string {
    if (!description || (!description.effectText && !description.shortEffect)) {
      return "";
    }
  
    if (size === "short") {
      return description.shortEffect || description.effectText || "";

    } else if (size === "long") {
      return description.effectText || description.shortEffect || "";

    } else {
      return "";
    }
  }

  displayFullNameTH(title: string): string {

    title = title.toLowerCase();

    switch (title) {
      case 'name':        return 'Name';
      case 'level':       return 'Level';
      case 'power':       return 'Power';
      case 'accuracy':    return 'Accuracy';
      case 'pp':          return 'PP';
      case 'type':        return 'Type';
      case 'dmgclass':    return 'Category';
      case 'initially':   return 'Initially';
      case 'description': return 'Description';
      default:            return '';  // Retourne une chaîne vide si l'attribut ne correspond à aucun cas
    }
  }

  displayShortNameTH(title: string): string {

    title = title.toLowerCase();

    switch (title) {
      case 'name':        return 'Name';
      case 'level':       return 'Lvl';
      case 'power':       return 'Pwr.';
      case 'accuracy':    return 'Acc.';
      case 'pp':          return 'PP';
      case 'type':        return 'Type';
      case 'dmgclass':    return 'Cat.';
      case 'initially':   return 'Init.';
      case 'description': return 'Descr.';
      default:            return '';  // Retourne une chaîne vide si l'attribut ne correspond à aucun cas
    }
  }

}
