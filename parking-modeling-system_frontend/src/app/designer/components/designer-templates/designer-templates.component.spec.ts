import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerTemplatesComponent } from './designer-templates.component';

describe('ParkObjectsComponent', () => {
  let component: DesignerTemplatesComponent;
  let fixture: ComponentFixture<DesignerTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignerTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignerTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
