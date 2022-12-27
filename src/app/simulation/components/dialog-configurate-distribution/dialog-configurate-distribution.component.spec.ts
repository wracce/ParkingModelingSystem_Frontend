import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfigurateDistributionComponent } from './dialog-configurate-distribution.component';

describe('DialogConfigurateDistributionComponent', () => {
  let component: DialogConfigurateDistributionComponent;
  let fixture: ComponentFixture<DialogConfigurateDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfigurateDistributionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfigurateDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
