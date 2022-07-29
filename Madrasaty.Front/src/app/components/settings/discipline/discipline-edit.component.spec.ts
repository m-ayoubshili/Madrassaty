import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineEditComponent } from './discipline-edit.component';

describe('DisciplineEditComponent', () => {
  let component: DisciplineEditComponent;
  let fixture: ComponentFixture<DisciplineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
