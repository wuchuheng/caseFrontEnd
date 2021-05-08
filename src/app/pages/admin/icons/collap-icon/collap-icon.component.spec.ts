import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapIconComponent } from './collap-icon.component';

describe('CollapIconComponent', () => {
  let component: CollapIconComponent;
  let fixture: ComponentFixture<CollapIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
