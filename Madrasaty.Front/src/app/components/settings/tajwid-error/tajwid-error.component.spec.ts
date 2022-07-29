import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TajwidErrorComponent } from './tajwid-error.component';

describe('TajwidErrorComponent', () => {
  let component: TajwidErrorComponent;
  let fixture: ComponentFixture<TajwidErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TajwidErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TajwidErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
