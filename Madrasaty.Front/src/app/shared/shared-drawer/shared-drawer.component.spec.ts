import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDrawerComponent } from './shared-drawer.component';

describe('SharedDrawerComponent', () => {
  let component: SharedDrawerComponent;
  let fixture: ComponentFixture<SharedDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
