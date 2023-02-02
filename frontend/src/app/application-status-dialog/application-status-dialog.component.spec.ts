import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationStatusDialogComponent } from './application-status-dialog.component';

describe('ApplicationStatusDialogComponent', () => {
  let component: ApplicationStatusDialogComponent;
  let fixture: ComponentFixture<ApplicationStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationStatusDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
