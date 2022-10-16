import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkObjectsComponent } from './park-objects.component';

describe('ParkObjectsComponent', () => {
  let component: ParkObjectsComponent;
  let fixture: ComponentFixture<ParkObjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkObjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
