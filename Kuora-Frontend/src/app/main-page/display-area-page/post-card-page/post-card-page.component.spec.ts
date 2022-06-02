import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardPageComponent } from './post-card-page.component';

describe('PostCardPageComponent', () => {
  let component: PostCardPageComponent;
  let fixture: ComponentFixture<PostCardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCardPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
