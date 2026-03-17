import { Component } from '@angular/core';
import { Posts } from '../posts/posts';
import { YoutubeVideos } from '../youtube-videos/youtube-videos';
import { SocialMediaPosts } from '../social-media-posts/social-media-posts';

@Component({
  selector: 'app-home',
  imports: [Posts, YoutubeVideos, SocialMediaPosts],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
