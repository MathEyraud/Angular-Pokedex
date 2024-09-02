import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GrowthRate } from 'src/app/models/pokemon/growth-rates/growth-rate.model';
import { PokemonSpecies } from 'src/app/models/pokemon/pokemon-species/pokemon-species';
import { PokemonSpeciesVariety } from 'src/app/models/pokemon/pokemon-species/pokemon-species-variety';
import { Pokemon } from 'src/app/models/pokemon/pokemon/pokemon';

@Component({
  selector: 'app-pokemon-details-global-informations',
  templateUrl: './pokemon-details-global-informations.component.html',
  styleUrls: ['./pokemon-details-global-informations.component.css']
})
export class PokemonDetailsGlobalInformationsComponent {

  @Input() pokemon          !: Pokemon;
  @Input() pokemonSpecies   !: PokemonSpecies;
  @Input() growthRate       !: GrowthRate;
  @Input() selectedVersion  !: string;
  @Input() alternativeForms !: Pokemon[];

  // Charger un pokemon depuis une forme alternative
  @Output() selectPokemon = new EventEmitter<number>();
  selectedAlternativeForm(id: number): void {
    console.log("test");
    this.selectPokemon.emit(id);
  }

  /**
   * IL N'Y A PAS D'OFFICIAL ARTWORK FEMAL
  /*
  selectedGender : string = 'male';        // Par défaut, 'male' est actif

  selectGender(gender: string) {
    this.selectedGender = gender;
  }*/

}
