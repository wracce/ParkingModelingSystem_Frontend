import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalScoreDialogComponent } from './total-score-dialog.component';

describe('TotalScoreDialogComponent', () => {
  let component: TotalScoreDialogComponent;
  let fixture: ComponentFixture<TotalScoreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalScoreDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalScoreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
