import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerSetupComponent } from './designer-setup.component';

describe('ParkSetupComponent', () => {
  let component: DesignerSetupComponent;
  let fixture: ComponentFixture<DesignerSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignerSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignerSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
