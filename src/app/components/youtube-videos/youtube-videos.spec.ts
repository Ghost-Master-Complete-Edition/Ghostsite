import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeVideos } from './youtube-videos';

describe('YoutubeVideos', () => {
  let component: YoutubeVideos;
  let fixture: ComponentFixture<YoutubeVideos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YoutubeVideos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YoutubeVideos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
