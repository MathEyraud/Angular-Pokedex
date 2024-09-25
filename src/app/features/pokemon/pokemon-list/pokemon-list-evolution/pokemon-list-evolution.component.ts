import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { ChainLink } from 'src/app/models/evolution/chain-link';
import { EvolutionChain } from 'src/app/models/evolution/evolution-chain';
import { PokemonForm } from 'src/app/models/pokemon/pokemon-forms/pokemon-form';
import { PokemonSpecies } from 'src/app/models/pokemon/pokemon-species/pokemon-species';
import { Pokemon } from 'src/app/models/pokemon/pokemon/pokemon';
import { EvolutionChainsService } from 'src/app/services/evolution/evolution-chains.service';
import { RegionService } from 'src/app/services/locations/regions/region.service';
import { PokemonFormsService } from 'src/app/services/pokemon/pokemon-forms/pokemon-forms.service';
import { PokemonSpeciesService } from 'src/app/services/pokemon/pokemon-species/pokemon-species.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-list-evolution',
  templateUrl: './pokemon-list-evolution.component.html',
  styleUrls: ['./pokemon-list-evolution.component.css']
})
export class PokemonListEvolutionComponent implements OnInit, OnChanges {

  // Inputs
  @Input() pokemon        : Pokemon | null = null;                // Pokémon de référence : Input qui reçoit l'objet Pokémon du composant parent.
  @Input() pokemonSpecies : PokemonSpecies | null = null;         // Pokémon de référence avec des détails.
  
  // Outputs
  @Output() selectPokemon = new EventEmitter<number>();           // Charger un autre pokemon de la liste d'évvolution
  @Output() evolutionStatusChange = new EventEmitter<boolean>();  // Propriété pour suivre s'il y a des évolutions
  
  // Propriétés du composant
  hasEvolution          : boolean = false;                        // Propriété pour vérifier s'il y a des évolutions       
  chainHasRegionalForms : boolean = false;                        // Indique si la chaîne contient des formes spéciales

  evolutionChain: { 
    chainLink             : ChainLink | null, 
    pokemonDetails        : Pokemon, 
    pokemonSpeciesDetails : PokemonSpecies, 
    pokemonForms          : PokemonForm[];
    previousPokemon       : Pokemon | null;
  }[] = [];                                                     // Liste des maillons de la chaîne et des détails associés





  constructor(
    private evolutionChainsService: EvolutionChainsService,
    private pokemonService        : PokemonService,
    private pokemonSpeciesService : PokemonSpeciesService,
    private pokemonFormsService   : PokemonFormsService,
    private regionService         : RegionService,
    protected router              : Router,
  ) {}





  // Initialise les données lors de la création du composant
  ngOnInit(): void {
    this.updateData();
  }

  // Met à jour les données lorsque le Pokémon d'entrée change
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon']) {
      this.updateData();
    }
  }




  /**
   * Met à jour les données d'évolution du Pokémon
  */
  private updateData(): void {

    // Réinitialise les données
    this.evolutionChain = [];
    this.hasEvolution = false;
  
    // Vérifie si les données nécessaires sont disponibles
    if (this.pokemonSpecies && this.pokemonSpecies.evolutionChainRessource.url) {

      // Récupère la chaîne d'évolution
      this.evolutionChainsService.getEvolutionChain(this.pokemonSpecies.evolutionChainRessource.url).pipe(

        // Transforme la chaîne d'évolution en détails de Pokémon
        switchMap((evolutionChain: EvolutionChain) => {
          if (evolutionChain && evolutionChain.chain) {return this.collectEvolutionDetails(evolutionChain.chain)}

          // Retourne un tableau vide si pas de chaîne d'évolution
          return of([]);
        }), 

        // Ranger la chaîne d'évolution par ordre d'évolution et de région
        map(evolutionData => this.sortEvolutions(evolutionData)),

        // Ajouter les informations sur les Pokémon précédents
        map(sortedData => this.addPreviousPokemon(sortedData)),

        // Gestion des erreurs
        catchError(error => {
          console.error('Erreur lors de la récupération de la chaîne d\'évolution:', error);

          // Retourne un tableau vide en cas d'erreur
          return of([]);
        })
        
      ).subscribe(evolutionData => {
        // Met à jour les données du composant avec les résultats
        this.evolutionChain = evolutionData;
        this.hasEvolution = this.evolutionChain.length > 1;

        // Émet le statut d'évolution vers le composant parent
        this.evolutionStatusChange.emit(this.hasEvolution);
      });

    // Si pas de données d'évolution, met à jour le statut
    } else {
      this.hasEvolution = false;
      this.evolutionStatusChange.emit(this.hasEvolution);
    }
  }
  

  /**
   * Collecte les détails des Pokémon pour toute la chaîne d'évolution
   * @param chain Le maillon de la chaîne d'évolution
   * @returns Un Observable avec les détails des Pokémon
  */  
  private collectEvolutionDetails(chain: ChainLink): Observable<{
    chainLink             : ChainLink | null;
    pokemonDetails        : Pokemon;
    pokemonSpeciesDetails : PokemonSpecies;
    pokemonForms          : PokemonForm[];
    previousPokemon       : Pokemon | null;
  }[]> {

    // Récupère les détails de l'espèce du Pokémon
    return this.pokemonSpeciesService.getPokemonSpeciesByNameOrId(chain.species.name).pipe(

      // Prépare les observables pour le Pokémon principal et ses variétés
      switchMap(species => {

        // Détection des formes régionales pour toute la chaîne
        if(!this.chainHasRegionalForms){
          this.chainHasRegionalForms = species.varieties.some(variety => 
            this.regionService.isRegionalForm(variety.pokemon.name)
          );
        }
        
        // Prépare les observables pour le Pokémon principal et ses variétés
        const observables = [

          // Observable pour le Pokémon principal
          this.pokemonService.getPokemonDetailByNameOrId(chain.species.name).pipe(

            switchMap(pokemon => 

              // Vérifie si le Pokémon a des formes
              pokemon.forms && pokemon.forms.length > 0 ?

                // Si oui, récupère les formes en utilisant l'URL de la première forme
                this.pokemonFormsService.getPokemonForms(pokemon.forms[0].url).pipe(
                  map(forms => ({
                    chainLink: chain,
                    pokemonDetails: pokemon,
                    pokemonSpeciesDetails: species,
                    pokemonForms: forms, 
                    previousPokemon:null,
                  }))
                ) 
                
                :

                // Si non, retourne un tableau vide pour les formes
                of({
                  chainLink: chain,
                  pokemonDetails: pokemon,
                  pokemonSpeciesDetails: species,
                  pokemonForms: [],
                  previousPokemon:null,
                })
            )
          ),

          // Observables pour chaque variété non par défaut (formes alternatives avec filtre)
          ...species.varieties
            .filter(v => !v.isDefault && this.isValidVariety(v.pokemon.name))
            .map(variety =>
              this.pokemonService.getPokemonDetailByNameOrId(variety.pokemon.name).pipe(
                switchMap(pokemon => 
                  // Vérifie si le Pokémon a des formes valides
                  pokemon.forms && pokemon.forms.length > 0 && this.isValidVariety(pokemon.forms[0].name) ?
                    this.pokemonFormsService.getPokemonForms(pokemon.forms[0].url).pipe(
                      map(forms => ({
                        chainLink: chain,
                        pokemonDetails: pokemon,
                        pokemonSpeciesDetails: species,
                        pokemonForms: forms,
                        previousPokemon:null,
                      }))
                    ) :
                    of({
                      chainLink: null,
                      pokemonDetails: pokemon,
                      pokemonSpeciesDetails: species,
                      pokemonForms: [], 
                      previousPokemon:null,
                    })
                )
              )
            )
        ];
  
        // Combine tous les observables
        return forkJoin(observables);
      }),

      // Traite les évolutions suivantes de manière récursive
      switchMap(results => {

        const chainObservables = chain.evolvesTo.map(evolution => 
          this.collectEvolutionDetails(evolution)
        );

        // Combine les résultats actuels avec les résultats des évolutions suivantes
        return forkJoin([of(results), ...chainObservables]);
      }),

      // Aplatit les résultats en un seul tableau
      map(([current, ...evolutions]) => {
        return [...current, ...evolutions.flat()];
      }), 

      // Gestion des erreurs
      catchError(error => {
        console.error('Erreur lors de la collecte des détails d\'évolution:', error);

        // Retourne un tableau vide en cas d'erreur
        return of([]);
      })

    );
  }

  private sortEvolutions(evolutionData: {
    chainLink             : ChainLink | null;
    pokemonDetails        : Pokemon;
    pokemonSpeciesDetails : PokemonSpecies;
    pokemonForms          : PokemonForm[];
    previousPokemon       : Pokemon | null;
  }[]): typeof evolutionData {

    // Fonction pour extraire le numéro de version du versionGroup
    const getVersionNumber = (form: PokemonForm) => {
      const versionUrl = form.versionGroup.url;
      const versionNumber = parseInt(versionUrl.split('/').filter(Boolean).pop() || '0', 10);
      return isNaN(versionNumber) ? 0 : versionNumber;
    };
  
    // Trier d'abord par numéro de version (du plus bas au plus élevé) et par ID d'espèce
    const sortedData = evolutionData.sort((a, b) => {
      const aVersion = Math.min(...a.pokemonForms.map(getVersionNumber));
      const bVersion = Math.min(...b.pokemonForms.map(getVersionNumber));
      if (aVersion !== bVersion) {
        return aVersion - bVersion;
      }
      return a.pokemonSpeciesDetails.id - b.pokemonSpeciesDetails.id;
    });
  
    // Séparer les Pokémon en trois catégories
    const babies: typeof evolutionData = [];
    const megas: typeof evolutionData = [];
    const normal: typeof evolutionData = [];
  
    sortedData.forEach(pokemon => {
      if (pokemon.pokemonSpeciesDetails.isBaby) {babies.push(pokemon);} 
      else if (pokemon.pokemonForms.some(form => form.isMega)) {megas.push(pokemon);} 
      else {normal.push(pokemon);}
    });
  
    // Combiner les trois catégories dans l'ordre correct
    return [...babies, ...normal, ...megas];
  }

  // TODO §§§
  private addPreviousPokemon(evolutionChain: typeof this.evolutionChain): typeof this.evolutionChain {

    for (let i = 0; i < evolutionChain.length; i++) {

      if (i === 0) {
        evolutionChain[i].previousPokemon = null; // Le premier Pokémon n'a pas de précédent
      
      } else {
        const currentPokemon = evolutionChain[i];
        const previousPokemon = evolutionChain[i - 1];

        // Vérifiez si le Pokémon actuel évolue du précédent
        if (currentPokemon && previousPokemon && currentPokemon.pokemonSpeciesDetails.evolvesFromSpeciesRessource?.name === previousPokemon.pokemonSpeciesDetails.name) {
          evolutionChain[i].previousPokemon = evolutionChain[i - 1].pokemonDetails;
          
        // Si ce n'est pas une évolution directe, cherchez le bon précédent
        // Cas ou il a plusieurs évolution possible pour un meme pokemon
        } else {

          const correctPrevious = evolutionChain.find(pokemon => 
            pokemon.pokemonSpeciesDetails.name === currentPokemon.pokemonSpeciesDetails.evolvesFromSpeciesRessource?.name
          );
          
          evolutionChain[i].previousPokemon = correctPrevious ? correctPrevious.pokemonDetails : null;
        }
      }
    }
  
    return evolutionChain;
  }

  /**
   * Vérifie si une variété de Pokémon est valide selon nos critères
   * @param name Le nom de la variété de Pokémon
   * @returns true si la variété est valide, false sinon
   */
  private isValidVariety(name: string): boolean {

    const lowerName = name.toLowerCase();

    return !lowerName.includes('-totem') &&
           !lowerName.includes('-starter') &&
           !lowerName.includes('female') &&
           !lowerName.includes('-cap') &&
           !lowerName.includes('-gmax') &&
           !lowerName.includes('-battle') &&
           !lowerName.includes('-ash') &&
           !lowerName.includes('-breed') &&
           !lowerName.startsWith('pikachu-') &&
           !lowerName.includes('-eternal'); 
  }

  /**
   * Gère la sélection d'un Pokémon dans la liste d'évolution
   * @param id L'ID du Pokémon sélectionné
  */
  onSelectPokemon(id: number): void {
    // Émet l'ID du Pokémon sélectionné vers le composant parent
    this.selectPokemon.emit(id);
  }
}
