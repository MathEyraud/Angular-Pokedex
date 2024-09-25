import { Injectable } from '@angular/core';
import { REGIONAL_FORMS } from 'src/app/shared/constants/pokemon-constans';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor() { }

  isRegionalForm(namePokemon: string): boolean {
    return Object.values(REGIONAL_FORMS).some(form => namePokemon.toLowerCase().includes(form.name.toLowerCase()));
  }
}