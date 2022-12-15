import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationProcessComponent } from './simulation-process.component';

describe('SimulationProcessComponent', () => {
  let component: SimulationProcessComponent;
  let fixture: ComponentFixture<SimulationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulationProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
