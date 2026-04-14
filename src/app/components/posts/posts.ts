import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StrapiService } from '../../services/strapiservice';

@Component({
  selector: 'app-posts',
  imports: [RouterLink],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class Posts {
  constructor(private strapiService: StrapiService) {}

  contentItems: any[] = []; //Data for posts gets read from here

  ngOnInit(): void {
    this.strapiService.getContentType('blog-posts').subscribe(
      (response) => {
        this.contentItems = response.data.slice(0,3);//We only show 3 posts
      },
      (error) => {
        console.error('Error fetching content:', error);
      }
    );
    this.contentItems.sort((a, b) => new Date(b.date1).getTime() - new Date(a.date1).getTime());
  }
}
