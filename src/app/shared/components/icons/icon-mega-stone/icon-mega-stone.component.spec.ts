import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconMegaStoneComponent } from './icon-mega-stone.component';

describe('IconMegaStoneComponent', () => {
  let component: IconMegaStoneComponent;
  let fixture: ComponentFixture<IconMegaStoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconMegaStoneComponent]
    });
    fixture = TestBed.createComponent(IconMegaStoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
