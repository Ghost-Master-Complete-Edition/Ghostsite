import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaPosts } from './social-media-posts';

describe('SocialMediaPosts', () => {
  let component: SocialMediaPosts;
  let fixture: ComponentFixture<SocialMediaPosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMediaPosts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaPosts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
