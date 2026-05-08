import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class VideosService {
  constructor() { }

  private http = inject(HttpClient);

  private apiKey = environment.YOUTUBE_API_KEY;
  private channelId = "UCZnhgqEWENvH2I9vd9HUegg";

  // "search" will return specific videos (high api cost)
  // "videos" will return most popular/recent videos (low api cost)  
  // "playlistItems" will return latest videos from a playlist (low api cost)
  private baseUrl = "https://www.googleapis.com/youtube/v3/playlistItems";
  private numberOfVideos = 3;
  private playlistId = "PLBtuaIoMX1m4kHZfAWiCvzmXItqny_aSG";

  fetchLatestVideos(): Observable<any> {
    const url = `${this.baseUrl}?key=${this.apiKey}&channelId=${this.channelId}&playlistId=${this.playlistId}&part=snippet&chart=mostPopular&type=video&maxResults=${this.numberOfVideos}&order=date`;
    return this.http.get(url);
  }
}
