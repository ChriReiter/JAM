import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanciesViewComponent } from './vacancies-view.component';

describe('VacanciesViewComponent', () => {
  let component: VacanciesViewComponent;
  let fixture: ComponentFixture<VacanciesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacanciesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacanciesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
