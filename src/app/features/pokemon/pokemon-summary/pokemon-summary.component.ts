import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon/pokemon/pokemon';
import { LoggerService } from 'src/app/services/logger/logger.service';

@Component({
  selector: 'app-pokemon-summary',
  templateUrl: './pokemon-summary.component.html',
  styleUrls: ['./pokemon-summary.component.css']
})
export class PokemonSummaryComponent {

  /**
   * ATTRIBUT
   */
  @Input()
  public pokemon !: Pokemon;

  @Output() 
  selectPokemon = new EventEmitter<number>();

  /**
   * CONSTRUCTEUR
   * @param router 
   */
  constructor(
    protected router        : Router,
    protected loggerService : LoggerService, 
  ) { }

  /**
   * 
   * @param id 
   */
  onSelectPokemon(id: number): void {
    this.selectPokemon.emit(id);
  }
}