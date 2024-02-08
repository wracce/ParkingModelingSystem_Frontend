import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerConfirmComponent } from './designer-confirm.component';

describe('DesignerConfirmComponent', () => {
  let component: DesignerConfirmComponent;
  let fixture: ComponentFixture<DesignerConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignerConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignerConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
