import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUnfoldIconComponent } from './menu-unfold-icon.component';

describe('MenuUnfoldIconComponent', () => {
  let component: MenuUnfoldIconComponent;
  let fixture: ComponentFixture<MenuUnfoldIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuUnfoldIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUnfoldIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
