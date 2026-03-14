import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class VideosService {
  constructor(private http: HttpClient) {}

/*   ApiKey for gmce */
  private apiKey = "AIzaSyC0cmzrxisZNnRPVC5TwWnD--br1HZa0Gk";
  private channelId = "UCZnhgqEWENvH2I9vd9HUegg";
  // "search" will return specific videos (high api cost)
  // "videos" will return most popular/recent videos (low api cost)
  private baseUrl = "https://www.googleapis.com/youtube/v3/search"; 
  private numberOfVideos = 3;

  fetchLatestVideos(): Observable<any> {
    const url = `${this.baseUrl}?key=${this.apiKey}&part=snippet&chart=mostPopular&channelId=${this.channelId}&maxResults=${this.numberOfVideos}&order=date`;
    return this.http.get(url);
  }
}
