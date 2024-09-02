import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, map, Observable } from 'rxjs';
import { ChainLink } from 'src/app/models/evolution/chain-link';
import { EvolutionChain } from 'src/app/models/evolution/evolution-chain';
import { PokemonSpecies } from 'src/app/models/pokemon/pokemon-species/pokemon-species';
import { Pokemon } from 'src/app/models/pokemon/pokemon/pokemon';
import { EvolutionChainsService } from 'src/app/services/evolution/evolution-chains.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-list-evolution',
  templateUrl: './pokemon-list-evolution.component.html',
  styleUrls: ['./pokemon-list-evolution.component.css']
})
export class PokemonListEvolutionComponent implements OnInit, OnChanges {

  @Input() pokemon        : Pokemon | null = null;                                  // Pokémon de référence : Input qui reçoit l'objet Pokémon du composant parent.
  @Input() pokemonSpecies : PokemonSpecies | null = null;                           // Pokémon de référence avec des détails.
  @Output() selectPokemon = new EventEmitter<number>();                             // Charger un autre pokemon de la liste d'évvolution
  public evolutionChain: { chainLink: ChainLink, pokemonDetails: Pokemon }[] = [];  // Liste des maillons de la chaîne et des détails associés





  constructor(
    private evolutionChainsService: EvolutionChainsService,
    private pokemonService: PokemonService,
    protected router : Router,
  ) {}





  ngOnInit(): void {
    this.updateData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon']) {
      this.updateData();
    }
  }





  private updateData(): void {

    // Réinitialise la liste evolutionChain à chaque changement de Pokémon
    this.evolutionChain = [];

    // Vérifie si le Pokémon de référence, son espèce, et l'URL de l'espèce sont définis.
    if (this.pokemonSpecies && this.pokemonSpecies.evolutionChainRessource.url) {

      const evolutionChainUrl = this.pokemonSpecies.evolutionChainRessource.url;

      // Appelle le service pour récupérer la chaîne d'évolution complète à partir de l'URL.
      this.evolutionChainsService.getEvolutionChain(evolutionChainUrl)

      // Souscrit à l'observable retourné par le service pour obtenir les données de la chaîne d'évolution.
        .subscribe((evolutionChain: EvolutionChain) => {

          // Vérifie si la chaîne d'évolution est définie dans la réponse.
          if (evolutionChain && evolutionChain.chain) {

            // Collecte tous les observables pour récupérer les détails de chaque Pokémon dans la chaîne.
            const observables = this.collectEvolutionDetails(evolutionChain.chain);

            // Utilise `forkJoin` pour attendre que tous les observables soient complétés avant de procéder.
            forkJoin(observables).subscribe(evolutionData => {

              // Stocke les données collectées dans `evolutionChain`, qui sera utilisé pour afficher la chaîne d'évolution.
              this.evolutionChain = evolutionData;
            });
          }
        });
    }
  }

  // Fonction pour collecter les détails des Pokémon pour toute la chaîne d'évolution
  private collectEvolutionDetails(chain: ChainLink): Observable<{ chainLink: ChainLink, pokemonDetails: Pokemon }>[] {

    // Initialise un tableau pour stocker les observables de chaque requête pour les détails des Pokémon.
    let observables: Observable<{ chainLink: ChainLink, pokemonDetails: Pokemon }>[] = [];

    // Utiliser le nom du Pokémon pour la requête
    const pokemonNameOrId = chain.species.name;  

    observables.push(

      // Appelle le service pour récupérer les détails du Pokémon à partir de l'URL de son espèce.
      this.pokemonService.getPokemonDetailByNameOrId(pokemonNameOrId).pipe(

        // Utilise `map` pour transformer les données reçues en un objet contenant le maillon de la chaîne et les détails du Pokémon.
        map(pokemon => ({ chainLink: chain, pokemonDetails: pokemon }))
      )
    );

    // Parcourt chaque évolution dans le tableau `evolvesTo` du maillon actuel de la chaîne.
    chain.evolvesTo.forEach(evolution => {

      // Appelle récursivement cette fonction pour collecter les observables des évolutions suivantes
      // et les ajoute au tableau des observables.
      observables = observables.concat(this.collectEvolutionDetails(evolution));
    });

    // Retourne le tableau d'observables, prêt à être utilisé avec `forkJoin`.
    return observables;
  }

  onSelectPokemon(id: number): void {
    this.selectPokemon.emit(id);
  }
}
