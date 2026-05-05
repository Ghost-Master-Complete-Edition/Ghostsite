import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class StrapiService {
  private apiUrl = environment.STRAPI_LINK; //http://localhost:1337 for testing locally

  blogPosts$: any[] = [];
  downloads$: any[] = [];

  constructor(private http: HttpClient) {
    this.getContentType('blog-posts').pipe(
        map(res => {
            this.blogPosts$ = res.data;
        })
    );

   this.getContentType('downloads').pipe(
        map(res => {
            this.blogPosts$ = res.data;
        })
    );

/*     this.getContentType('blog-posts').subscribe(
      (response) => {
        this.blogPosts$ = response.data;
      },
      (error) => {
        console.error('Error fetching content:', error);
      }
    ); */

/*     this.getContentType('downloads').subscribe(
      (response) => {
        this.downloads$ = response.data;
      },
      (error) => {
        console.error('Error fetching content:', error);
      }
    ); */

    this.blogPosts$.sort((a, b) => b.id - a.id);
    this.downloads$.sort((a, b) => b.id - a.id);
  }

  getBlogPosts() {
    if (!this.blogPosts$) {
      this.getContentType('blog-posts').subscribe(
        (response) => {
          this.blogPosts$ = response.data;
        }
      );
    }
    return this.blogPosts$;
  }

  getDownloads() {
    if (!this.downloads$) {
      this.getContentType('downloads').subscribe(
        (response) => {
          this.downloads$ = response.data;
        }
      );
    }
    return this.downloads$;
  }

  getContentType(contentType: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/${contentType}?populate=*&cors=*`);
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