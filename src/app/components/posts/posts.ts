import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StrapiService } from '../../services/strapiservice';

@Component({
  selector: 'app-posts',
  imports: [RouterLink],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class Posts implements OnInit {
  constructor() {};
  private strapiService = inject(StrapiService);
  contentItems: any[] = []; //Data for posts gets read from here
  
  ngOnInit(): void {
    this.strapiService.blogPosts$.then(response => {
      console.log('here');
      console.log(response.data);
      this.contentItems = response.data;
      this.contentItems = this.contentItems.slice(0, 3);
    });
  }
}
