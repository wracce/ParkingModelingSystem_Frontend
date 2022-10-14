import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkDesignerComponent } from './park-designer.component';

describe('ParkDesignerComponent', () => {
  let component: ParkDesignerComponent;
  let fixture: ComponentFixture<ParkDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkDesignerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
