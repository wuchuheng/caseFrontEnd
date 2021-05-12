import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiUploadComponent } from './multi-upload.component';

describe('MultiUploadComponent', () => {
  let component: MultiUploadComponent;
  let fixture: ComponentFixture<MultiUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
