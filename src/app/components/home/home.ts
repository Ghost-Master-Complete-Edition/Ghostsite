import { Component } from '@angular/core';
import { Posts } from '../posts/posts';
import { YoutubeVideos } from '../youtube-videos/youtube-videos';

@Component({
  selector: 'app-home',
  imports: [Posts, YoutubeVideos],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
