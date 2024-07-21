import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhotoComponent } from './add-photo.component';

describe('AddPhotoComponent', () => {
  let component: AddPhotoComponent;
  let fixture: ComponentFixture<AddPhotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPhotoComponent]
    });
    fixture = TestBed.createComponent(AddPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
