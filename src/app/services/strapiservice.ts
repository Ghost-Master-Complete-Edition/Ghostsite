import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay, Subject, takeUntil } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class StrapiService {
  private apiUrl = environment.STRAPI_LINK; //http://localhost:1337 for testing locally
  private http = inject(HttpClient);
  blogPosts$: Observable<any>;
  downloads$: Observable<any>;

  constructor() {
    this.blogPosts$ = this.getContentType('blog-posts').pipe(shareReplay());
    this.downloads$ = this.getContentType('downloads').pipe(shareReplay());
  }

  getContentType(contentType: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/${contentType}?populate=*&cors=*`);
  }

  getSingleItem(contentType: string, id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/${contentType}/${id}`);
  }

  createItem(contentType: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/${contentType}`, { data });
  }

  updateItem(contentType: string, id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/${contentType}/${id}`, { data });
  }

  deleteItem(contentType: string, id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/${contentType}/${id}`);
  }
}