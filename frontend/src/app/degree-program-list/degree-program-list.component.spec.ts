import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeProgramListComponent } from './degree-program-list.component';

describe('DegreeProgramListComponent', () => {
  let component: DegreeProgramListComponent;
  let fixture: ComponentFixture<DegreeProgramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegreeProgramListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreeProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
