import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelChildComponent } from './level-child.component';

describe('LevelChildComponent', () => {
  let component: LevelChildComponent;
  let fixture: ComponentFixture<LevelChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
