import { Component, OnInit } from '@angular/core';
import { VideosService } from '../../services/videos';

@Component({
  selector: 'app-youtube-videos',
  imports: [],
  templateUrl: './youtube-videos.html',
  styleUrl: './youtube-videos.scss',
})
export class YoutubeVideos implements OnInit {
  constructor(private videosService: VideosService) { }

  videos: any[] = [];

  ngOnInit(): void {

    this.videosService.fetchLatestVideos().subscribe((receivedVideos) => {
      this.videos.push(receivedVideos.items);
      console.log(this.videos);
    }
    );
  };
}

