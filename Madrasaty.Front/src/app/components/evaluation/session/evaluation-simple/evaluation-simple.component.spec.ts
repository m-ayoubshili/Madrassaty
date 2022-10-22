import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationSimpleComponent } from './evaluation-simple.component';

describe('EvaluationSimpleComponent', () => {
  let component: EvaluationSimpleComponent;
  let fixture: ComponentFixture<EvaluationSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
