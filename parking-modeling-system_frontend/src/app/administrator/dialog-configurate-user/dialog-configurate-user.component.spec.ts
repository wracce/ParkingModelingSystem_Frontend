import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfigurateUserComponent } from './dialog-configurate-user.component';

describe('DialogConfigurateUserComponent', () => {
  let component: DialogConfigurateUserComponent;
  let fixture: ComponentFixture<DialogConfigurateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfigurateUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfigurateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
