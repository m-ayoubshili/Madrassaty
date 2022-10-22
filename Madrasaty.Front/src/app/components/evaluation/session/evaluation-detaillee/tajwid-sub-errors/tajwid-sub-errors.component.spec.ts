import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TajwidSubErrorsComponent } from './tajwid-sub-errors.component';

describe('TajwidSubErrorsComponent', () => {
  let component: TajwidSubErrorsComponent;
  let fixture: ComponentFixture<TajwidSubErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TajwidSubErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TajwidSubErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
