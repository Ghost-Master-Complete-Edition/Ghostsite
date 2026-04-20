import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class StrapiService {
  private apiUrl = environment.STRAPI_LINK; //http://localhost:1337 for testing locally

  blogPosts: any[] = []; 
  downloads: any[] = [];

  constructor(private http: HttpClient) {
    console.log(this.blogPosts);
    console.log(this.downloads);
    this.getContentType('blog-posts').subscribe(
      (response) => {
        this.blogPosts = response.data;
      },
      (error) => {
        console.error('Error fetching content:', error);
      }
    );
    this.getContentType('downloads').subscribe(
      (response) => {
        this.downloads = response.data;
      },
      (error) => {
        console.error('Error fetching content:', error);
      }
    );
    console.log(this.blogPosts);
    console.log(this.downloads);
    this.blogPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    this.downloads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
   }

  getBlogPosts(){
    return this.blogPosts;
  }

  getDownloads(){
    return this.downloads;
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