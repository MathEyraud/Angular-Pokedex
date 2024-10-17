import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonTypeSizeService {

  private typeSizeSubject     = new BehaviorSubject<'normal' | 'short' | 'veryShort'>('normal');
  private wrapTypesSubject    = new BehaviorSubject<boolean>(false);
  private displayTypesSubject = new BehaviorSubject<boolean>(true);

  typeSize$     = this.typeSizeSubject.asObservable();
  wrapTypes$    = this.wrapTypesSubject.asObservable();
  displayTypes$ = this.displayTypesSubject.asObservable();

  setTypeSize(size: 'normal' | 'short' | 'veryShort') {
    this.typeSizeSubject.next(size);
  }

  getTypeSize() : 'normal' | 'short' | 'veryShort' {
    return this.typeSizeSubject.value;
  }

  setWrapTypes(wrap: boolean) {
    this.wrapTypesSubject.next(wrap);
  }

  getWrapTypes() {
    return this.wrapTypesSubject.value;
  }

  setDisplayType(display: boolean) {
    this.displayTypesSubject.next(display);
  }

  getDisplayTypes() {
    return this.displayTypesSubject.value;
  }
}
