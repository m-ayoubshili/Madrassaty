import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationDetailleeComponent } from './evaluation-detaillee.component';

describe('EvaluationDetailleeComponent', () => {
  let component: EvaluationDetailleeComponent;
  let fixture: ComponentFixture<EvaluationDetailleeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationDetailleeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationDetailleeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
