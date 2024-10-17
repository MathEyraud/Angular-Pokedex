import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Ability } from 'src/app/models/pokemon/abilities/ability';
import { AbilityDisplayService } from 'src/app/services/pokemon/abilities/ability-display.service';

@Component({
  selector: 'app-ability-card',
  templateUrl: './ability-card.component.html',
  styleUrls: ['./ability-card.component.css']
})
export class AbilityCardComponent implements OnInit, AfterViewInit{

  @Input() ability        : Ability | null = null;
  @Input() isHidden       : boolean = false;
  @Input() noHiddenAbility: boolean = false;

  @ViewChild('abilityCard') abilityCard!: ElementRef;
  @ViewChild('longDescription') longDescription!: ElementRef;
  @ViewChild('shortDescription') shortDescription!: ElementRef;

  abilityName: string = '';
  abilityLongEffect: string = '';
  abilityShortEffect: string = '';

  constructor(private abilityDisplayService: AbilityDisplayService) {}

  ngOnInit() {
    this.updateAbilityDisplay();
  }

  ngAfterViewInit() {
    this.checkDescription();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkDescription();
  }

  updateAbilityDisplay(language: string = 'en') {
    
    if(this.ability){

      this.abilityName = this.abilityDisplayService.getAbilityName(this.ability, language);
      const description = this.abilityDisplayService.getAbilityDescription(this.ability, language);

      if (description) {
        this.abilityLongEffect = description.effect;
        this.abilityShortEffect = description.shortEffect;

      } else {
        this.abilityLongEffect = 'Description not available';
        this.abilityShortEffect = 'Not available';
      }

    }
    
  }

  displayDescription(size: string): string {
    
    if (size === "short") {
      return this.abilityShortEffect || this.abilityLongEffect || "";

    } else if (size === "long") {
      return this.abilityLongEffect || this.abilityShortEffect || "";

    } else {
      return "";
    }
  }

  // Getter pour vérifier si la carte doit afficher "No hidden talent"
  get showNoHiddenTalent(): boolean {
    return this.isHidden && this.noHiddenAbility;
  }

  private checkDescription() {

    if (this.abilityCard && this.longDescription && this.shortDescription) {
      
      const cardHeight = this.abilityCard.nativeElement.offsetHeight;
      const cardWidth = this.abilityCard.nativeElement.offsetWidth;

      if (cardHeight > cardWidth) {
        this.longDescription.nativeElement.style.display = 'none';
        this.shortDescription.nativeElement.style.display = 'block';
      } else {
        this.longDescription.nativeElement.style.display = 'block';
        this.shortDescription.nativeElement.style.display = 'none';
      }
    }
  }

}
