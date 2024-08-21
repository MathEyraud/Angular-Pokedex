import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PokemonSummaryComponent } from '../pokemon-summary.component';
import { EvolutionDetail } from 'src/app/models/evolution/evolution-detail';

@Component({
  selector: 'app-pokemon-summary-card-evolution',
  templateUrl: './pokemon-summary-card-evolution.component.html',
  styleUrls: ['./pokemon-summary-card-evolution.component.css']
})
export class PokemonSummaryCardEvolutionComponent extends PokemonSummaryComponent{

  @Input() evolutionDetails: EvolutionDetail[] = [];  // Entrée pour les détails de l'évolution, injectée depuis le composant parent.
  evolutionMethods: string[] = [];





  ngOnInit() {
    this.evolutionMethods = this.getEvolutionMethods(this.evolutionDetails);
  }




  getEvolutionTrigger(): string | null {

    if (this.evolutionDetails && this.evolutionDetails.length > 0) {

      const detail = this.evolutionDetails[0];

      if (detail.trigger?.name === 'level-up') return 'level-up';
      if (detail.trigger?.name === 'trade') return 'trade';
      if (detail.trigger?.name === 'use-item') return 'use-item';
      if (detail.trigger?.name === 'shed') return 'shed';
      if (detail.trigger?.name === 'spin') return 'spin';
      if (detail.trigger?.name === 'tower-of-darkness') return 'tower-of-darkness';
      if (detail.trigger?.name === 'tower-of-waters') return 'tower-of-waters';
      if (detail.trigger?.name === 'three-critical-hits') return 'three-critical-hits';
      if (detail.trigger?.name === 'take-damage') return 'take-damage';
      if (detail.trigger?.name === 'other') return 'other';
      if (detail.trigger?.name === 'agile-style-move') return 'agile-style-move';
      if (detail.trigger?.name === 'strong-style-move') return 'strong-style-move';
      if (detail.trigger?.name === 'recoil-damage') return 'recoil-damage';

    }
    return null;
  }

  getEvolutionMethods(evolutionDetails: EvolutionDetail[]): string[] {

    if (!evolutionDetails || evolutionDetails.length === 0) {
      return [' '];
    }
  
    return evolutionDetails.map(detail => {
      const criteria: string[] = [];
  
      if (detail.minLevel) criteria.push(`Niveau ${detail.minLevel}`);
      if (detail.item) criteria.push(`Utiliser ${detail.item.name}`);
      if (detail.trigger?.name === 'trade') criteria.push('Échange');
      if (detail.minHappiness) criteria.push(`Bonheur ≥ ${detail.minHappiness}`);
      if (detail.minBeauty) criteria.push(`Beauté ≥ ${detail.minBeauty}`);
      if (detail.minAffection) criteria.push(`Affection ≥ ${detail.minAffection}`);
      if (detail.gender !== null) criteria.push(`Genre: ${detail.gender === 1 ? 'Femelle' : 'Mâle'}`);
      if (detail.heldItem) criteria.push(`Tenir ${detail.heldItem.name}`);
      if (detail.knownMove) criteria.push(`Connaître ${detail.knownMove.name}`);
      if (detail.knownMoveType) criteria.push(`Connaître une attaque ${detail.knownMoveType.name}`);
      if (detail.location) criteria.push(`À ${detail.location.name}`);
      if (detail.needsOverworldRain) criteria.push('Sous la pluie');
      if (detail.partySpecies) criteria.push(`Avec ${detail.partySpecies.name} dans l'équipe`);
      if (detail.partyType) criteria.push(`Avec un Pokémon de type ${detail.partyType.name} dans l'équipe`);
      if (detail.relativePhysicalStats !== null) {
        if (detail.relativePhysicalStats === 1) criteria.push('Attaque > Défense');
        if (detail.relativePhysicalStats === 0) criteria.push('Attaque = Défense');
        if (detail.relativePhysicalStats === -1) criteria.push('Attaque < Défense');
      }
      if (detail.timeOfDay) criteria.push(`Pendant la ${detail.timeOfDay === 'day' ? 'journée' : 'nuit'}`);
      if (detail.tradeSpecies) criteria.push(`Échange contre ${detail.tradeSpecies.name}`);
      if (detail.turnUpsideDown) criteria.push('Console retournée');
  
      return criteria.length > 0 ? criteria.join(' & ') : ' ';
    });
  }
}