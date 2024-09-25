import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconShinyComponent } from './icon-shiny.component';

describe('IconShinyComponent', () => {
  let component: IconShinyComponent;
  let fixture: ComponentFixture<IconShinyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconShinyComponent]
    });
    fixture = TestBed.createComponent(IconShinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
