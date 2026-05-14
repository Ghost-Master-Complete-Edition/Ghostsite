import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { strapi } from '@strapi/client';

@Injectable({
  providedIn: 'root'
})


export class StrapiService {
  private apiUrl = environment.STRAPI_LINK; //http://localhost:1337 for testing locally
  private apiKey = environment.STRAPI_API_KEY;
  private http = inject(HttpClient);
  private strapi = strapi({
    baseURL: `${this.apiUrl}/api`,
    auth: this.apiKey
  });

  private blogPostsCollection = this.strapi.collection('blog-posts');
  private downloadsCollection = this.strapi.collection('downloads');

  blogPosts$: Promise<any>;
  downloads$: Promise<any>;

  constructor() {
     this.blogPosts$ = this.blogPostsCollection.find({
      sort: 'createdAt:desc',
      populate: '*'
     }).then((data : any) =>{
      return data;
     });

     this.downloads$ = this.downloadsCollection.find({
      sort: 'createdAt:desc'
     }).then((data : any) =>{
      return data;
     });

/*      this.blogPosts$ = this.getContentType('blog-posts').pipe(shareReplay(1));
    this.downloads$ = this.getContentType('downloads').pipe(shareReplay(1));  */
  }

  /*   Outdated http requests */

  /* getContentType(contentType: string): Observable<any> {
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
  } */


}