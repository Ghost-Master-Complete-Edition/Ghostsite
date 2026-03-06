import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class VideosService {
  constructor(private http: HttpClient) {}

/*   Do not add apiKey to repository */
  private apiKey = "";
  private channelId = "UCZnhgqEWENvH2I9vd9HUegg";
  // "search" will return specific videos (high api cost)
  // "videos" will return most popular/recent videos (low api cost)
  private baseUrl = "https://www.googleapis.com/youtube/v3/videos"; 
  private numberOfVideos = 3;

  fetchLatestVideos(): Observable<any> {
    const url = `${this.baseUrl}?key=${this.apiKey}&part=snippet&chart=mostPopular&channelId=${this.channelId}&maxResults=${this.numberOfVideos}&order=date`;
    return this.http.get(url);
  }
}
