import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAreaPageComponent } from './display-area-page.component';

describe('DisplayAreaPageComponent', () => {
  let component: DisplayAreaPageComponent;
  let fixture: ComponentFixture<DisplayAreaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAreaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAreaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
