import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityCardComponent } from './ability-card.component';

describe('AbilityCardComponent', () => {
  let component: AbilityCardComponent;
  let fixture: ComponentFixture<AbilityCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbilityCardComponent]
    });
    fixture = TestBed.createComponent(AbilityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
