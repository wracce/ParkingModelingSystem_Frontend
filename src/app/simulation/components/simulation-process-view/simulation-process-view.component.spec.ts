import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationProcessViewComponent } from './simulation-process-view.component';

describe('SimulationProcessViewComponent', () => {
  let component: SimulationProcessViewComponent;
  let fixture: ComponentFixture<SimulationProcessViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulationProcessViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulationProcessViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
