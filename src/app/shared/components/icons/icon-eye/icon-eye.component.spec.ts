import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconEyeComponent } from './icon-eye.component';

describe('IconEyeComponent', () => {
  let component: IconEyeComponent;
  let fixture: ComponentFixture<IconEyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconEyeComponent]
    });
    fixture = TestBed.createComponent(IconEyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
