import { Component, inject, OnInit } from '@angular/core';
import { StrapiService } from '../../services/strapiservice';

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements OnInit {
  constructor() { };
  private strapiService = inject(StrapiService);
  contentItems: any[]; //Data for posts gets read from here

  ngOnInit(): void {
    this.strapiService.blogPosts$.subscribe(response => {
      this.contentItems = response.data;
    });
    this.contentItems.sort((a, b) => b.id - a.id);
    console.log(this.contentItems);
  }
}
