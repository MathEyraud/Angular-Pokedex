import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconEggsComponent } from './icon-eggs.component';

describe('IconEggsComponent', () => {
  let component: IconEggsComponent;
  let fixture: ComponentFixture<IconEggsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconEggsComponent]
    });
    fixture = TestBed.createComponent(IconEggsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
