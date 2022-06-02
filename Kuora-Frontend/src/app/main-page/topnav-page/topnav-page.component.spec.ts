import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopnavPageComponent } from './topnav-page.component';

describe('TopnavPageComponent', () => {
  let component: TopnavPageComponent;
  let fixture: ComponentFixture<TopnavPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopnavPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnavPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
