import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-weaknesses',
  templateUrl: './pokemon-weaknesses.component.html',
  styleUrls: ['./pokemon-weaknesses.component.css']
})
export class PokemonWeaknessesComponent {

  @Input() weaknessesAndResistances!: { [type: string]: number };

  // Explicitly define the types of the arrays
  categorizedWeaknesses: {
    veryResistant: string[];
    resistant: string[];
    immune: string[];
    veryWeak: string[];
    weak: string[];
  } = {
    veryResistant: [],
    resistant: [],
    immune: [],
    veryWeak: [],
    weak: [],
  };

  ngOnInit(): void {
    this.categorizeWeaknesses();
  }

  categorizeWeaknesses() {

    for (const [type, multiplier] of Object.entries(this.weaknessesAndResistances)) {

      if (multiplier === 0.25) {
        this.categorizedWeaknesses.veryResistant.push(type);
        
      } else if (multiplier === 0.5) {
        this.categorizedWeaknesses.resistant.push(type);

      } else if (multiplier === 0) {
        this.categorizedWeaknesses.immune.push(type);

      } else if (multiplier === 4) {
        this.categorizedWeaknesses.veryWeak.push(type);

      } else if (multiplier === 2) {
        this.categorizedWeaknesses.weak.push(type);
      }
    }
  }

}