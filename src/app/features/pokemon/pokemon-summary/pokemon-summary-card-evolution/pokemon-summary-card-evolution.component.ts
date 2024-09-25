import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PokemonSummaryComponent } from '../pokemon-summary.component';
import { PokemonSpecies } from 'src/app/models/pokemon/pokemon-species/pokemon-species';
import { EvolutionDetail } from 'src/app/models/evolution/evolution-detail';
import { PokemonForm } from 'src/app/models/pokemon/pokemon-forms/pokemon-form';
import { RegionService } from 'src/app/services/locations/regions/region.service';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { Pokemon } from 'src/app/models/pokemon/pokemon/pokemon';
import { PokemonColorService } from 'src/app/services/pokemon/pokemon-colors/pokemon-color.service';

@Component({
  selector: 'app-pokemon-summary-card-evolution',
  templateUrl: './pokemon-summary-card-evolution.component.html',
  styleUrls: ['./pokemon-summary-card-evolution.component.css']
})
export class PokemonSummaryCardEvolutionComponent extends PokemonSummaryComponent implements OnInit{

  // Inputs du composant
  @Input() evolutionDetails     : EvolutionDetail[] = [];  // Détails de l'évolution du Pokémon
  @Input() pokemonSpecies       : PokemonSpecies | null = null;  // Espèce du Pokémon
  @Input() pokemonForms         !: PokemonForm[];  // Formes du Pokémon
  @Input() chainHasRegionalForms: boolean = false;
  @Input() previousPokemon      : Pokemon | null = null;
  
  // Propriétés pour stocker les informations d'évolution
  evolutionMethods    : string[] = [];    // Critères d'évolution pour chaque méthode
  index               : number = 0;       // Index utilisé dans les boucles
  pokemonRarity       : string = '';      // Rareté du Pokémon (baby, legendary, mythical, default)
  pokemonForm         : string = '';      // Forme du Pokémon (Mega, Gmax, Alola, etc.)
  isRegionalForm      : boolean = false;  // Indique si c'est une forme régionale
  previousPokemonName : string = '';      // Nom du Pokémon précédent
  isExpanded          : boolean = false;  // Propriété pour gérer l'état d'expansion
  contentOverflows    : boolean = false;  // Propriété pour gérer l'état d'expansion

  @ViewChild('containerEvolutionMethods') evolutionMethodsRef!: ElementRef;
  
  constructor(
    protected override router: Router,
    protected override loggerService: LoggerService,
    private regionService: RegionService,
    private cdr: ChangeDetectorRef,
    private pokemonColorService: PokemonColorService,
  ) {
    super(router, loggerService);
  }

  ngOnInit() {

    // Initialisation des données
    this.initializeEvolutionMethods();
    this.updatePokemonRarityAndForm();
    this.updatePreviousPokemonInfo();
  }

  // Appelé lorsque les inputs changent
  ngOnChanges(changes: SimpleChanges) {
    if (changes['evolutionDetails'] || changes['pokemonSpecies'] || changes['pokemonForms']) {
      this.initializeEvolutionMethods();
      this.updatePokemonRarityAndForm();
      this.updatePreviousPokemonInfo();
    }
  }

  // Appelé lorsque le composant est rendu
  ngAfterViewInit() {
    this.checkContentOverflow();
    this.cdr.detectChanges(); // Force la détection des changements après la vérification
  }





  // Initialise les méthodes d'évolution
  private initializeEvolutionMethods() {
    
    this.evolutionMethods = [];
  
    // Obtenir l'ordre de la forme actuelle
    const currentFormOrder = this.pokemonForms && this.pokemonForms.length > 0 
      ? this.pokemonForms[0].formOrder 
      : 1; // Par défaut, on considère que c'est la forme 1
    
    let methodFound = false;
  
    // Vérifier si cette méthode d'évolution correspond à la forme actuelle
    this.evolutionDetails.forEach((detail, index) => {
      if (this.isMethodForCurrentForm(detail, index, currentFormOrder)) {
        this.evolutionMethods.push(detail.getEvolutionDescription());
        methodFound = true;
      }
    });

    // Si aucune méthode n'a été trouvée pour la forme actuelle et que ce n'est pas la forme de base,
    // utilisez la méthode de la forme de base (index 0)
    if (!methodFound && currentFormOrder > 1 && this.evolutionDetails.length > 0) {
      this.evolutionMethods.push(this.evolutionDetails[0].getEvolutionDescription());
    }
  }
  
  // Vérifie si une méthode d'évolution correspond à la forme actuelle du Pokémon
  private isMethodForCurrentForm(detail: EvolutionDetail, index: number, currentFormOrder: number): boolean {

    // Pour les formes régionales, on prend la méthode correspondant à l'ordre de la forme
    if (this.pokemon.name && this.regionService.isRegionalForm(this.pokemon.name)) {
      return index + 1 === currentFormOrder;
    }
    
    // Pour les formes non régionales, on prend soit la première méthode, 
    // soit toutes s'il n'y a pas de forme régionale
    return index === 0 || !this.chainHasRegionalForms;
  }
  
  // Met à jour la rareté et la forme du Pokémon
  private updatePokemonRarityAndForm() {
    this.pokemonRarity = this.getRarity();
    this.pokemonForm = this.getForm();
  }

  private updatePreviousPokemonInfo() {
    if (this.previousPokemon) {this.previousPokemonName = this.previousPokemon.formattedName;} 
    else {this.previousPokemonName = "";}
  }

    // Détermine la rareté du Pokémon
    private getRarity(): string {
      if (this.pokemonSpecies?.isLegendary) return 'legendary';
      if (this.pokemonSpecies?.isMythical) return 'mythical';
      return 'default';
    }

  // Détermine la forme du Pokémon
  private getForm(): string {
    
    if (this.pokemonForms && this.pokemonForms.length > 0) {

      const form = this.pokemonForms[0];

      if (form.isMega) return 'mega';
      if (this.pokemonSpecies?.isBaby) return 'baby';
      if (form.formName !== '') return 'default';
    }
    return 'default';
  }

  checkContentOverflow() {
    if (this.evolutionMethodsRef) {
      const element        = this.evolutionMethodsRef.nativeElement;
      const styles         = window.getComputedStyle(element);
      const lineHeight     = parseFloat(styles.lineHeight);
      const paddingTop     = parseFloat(styles.paddingTop);
      const paddingBottom  = parseFloat(styles.paddingBottom);

      // Calculer la hauteur totale d'une ligne, y compris le padding
      const singleLineHeight = lineHeight + paddingTop + paddingBottom;

      // Utiliser une marge de tolérance pour la détection du débordement
      const overflowTolerance = 2; // en pixels

      this.contentOverflows = element.scrollHeight > (singleLineHeight + overflowTolerance);
    }
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  getPokemonColor(): string {
    if (this.pokemonSpecies && this.pokemonSpecies.colorRessource) {
      return this.pokemonColorService.getColor(this.pokemonSpecies.colorRessource.name);
    }
    return 'transparent'; // Couleur par défaut si aucune couleur n'est spécifiée
  }
}