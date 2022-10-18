import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkSetupComponent } from './park-setup.component';

describe('ParkSetupComponent', () => {
  let component: ParkSetupComponent;
  let fixture: ComponentFixture<ParkSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
