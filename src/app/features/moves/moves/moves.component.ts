import { Component, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Moves } from 'src/app/models/moves/moves/moves';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { MovePaginationService } from 'src/app/services/move/move-pagination.service';
import { MoveService } from 'src/app/services/move/move.service';

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.css']
})
export class MovesComponent {

  /**
    * ATTRIBUT
  */
  moves           : Moves[] = [];         // Tableau pour stocker les attaques chargés
  totalData       : number = 0;           // Nombre total d'attaques disponibles dans l'API
  currentOffset   : number = 0;           // Offset actuel pour le chargement des Pokémon (utilisé pour la pagination côté serveur)
  itemsPerLoad    : number = 100;         // Nombre d'attaques à charger à chaque requête
  isLoading       : boolean = false;      // Indicateur de chargement en cours
  scrollThreshold : number = 100;         // Seuil de déclenchement du chargement (en pixels avant le bas de la page)
  subscriptions   : Subscription[] = [];  // Tableau pour stocker les souscriptions afin de les désinscrire plus tard





  /**
   * CONSTRUTEUR
  */
  constructor(
    protected loggerService      : LoggerService, 
    protected moveService        : MoveService,
    protected paginationService  : MovePaginationService,  // Service de gestion de la pagination
  ) {}
  




  /**
   * HOOKS
  */
  ngOnInit(): void {

    // S'abonne aux observables du service
    this.paginationService.data$.subscribe(data => {this.moves = data});
    this.paginationService.totalData$.subscribe(total => {this.totalData = total});
    this.paginationService.offset$.subscribe(offset => {this.currentOffset = offset});

    // Charge les premières données si la liste est vide
    if (this.moves.length === 0) {
      this.loadMoreData();
    }
  }

  ngOnDestroy(): void {
    // Nettoie les souscriptions pour éviter les fuites de mémoire
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }





  // -------- //
  // LISTENER //
  // -------- //
  // Écouteur d'événement de défilement
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    // Vérifie si l'utilisateur est proche du bas de la page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - this.scrollThreshold) {
      this.loadMoreData();
    }
  }





  /**
   * METHODES
  */
  // Méthode pour charger plus de données
  loadMoreData(): void {

    // Vérifier si un chargement est déjà en cours ou si toutes les données ont été chargés
    if (this.isLoading || (this.totalData > 0 && this.moves.length >= this.totalData)) {
      return;
    }

    // Marquer le début du chargement
    this.isLoading = true;

    // Appeler le service pour obtenir les données
    const subscription = this.moveService.getData(this.itemsPerLoad, this.currentOffset).subscribe({

      next: (data) => {

        // Ajouter les nouvelles données à la liste existante
        this.moves = [...this.moves, ...data.results];

        // Mettre à jour le nombre total de données
        this.totalData = data.total;

        // Augmenter l'offset pour le prochain chargement
        this.currentOffset += this.itemsPerLoad;

        // Marquer la fin du chargement
        this.isLoading = false;

        // Update the state service
        this.paginationService.setData(this.moves);
        this.paginationService.setTotalData(this.totalData);
        this.paginationService.setOffset(this.currentOffset);
      },

      error: (error) => {

        // Journaliser l'erreur en cas de problème
        this.loggerService.error('[MovesComponent - loadMoreData] ' + 'Error loading data', error);

        // Marquer la fin du chargement même en cas d'erreur
        this.isLoading = false;
      }
    });

    // Ajouter la souscription à la liste pour la désinscrire plus tard
    this.subscriptions.push(subscription);
  }
}
