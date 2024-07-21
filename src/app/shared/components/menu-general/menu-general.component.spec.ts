import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGeneralComponent } from './menu-general.component';

describe('MenuGeneralComponent', () => {
  let component: MenuGeneralComponent;
  let fixture: ComponentFixture<MenuGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuGeneralComponent]
    });
    fixture = TestBed.createComponent(MenuGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
