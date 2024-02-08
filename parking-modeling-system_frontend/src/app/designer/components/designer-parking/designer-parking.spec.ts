import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerParkingComponent } from './designer-parking.component';

describe('DesignerParkingComponent', () => {
  let component: DesignerParkingComponent;
  let fixture: ComponentFixture<DesignerParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignerParkingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignerParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
