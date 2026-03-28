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
        this.contentItems = response.data;
      },
      (error) => {
        console.error('Error fetching content:', error);
      }
    );
    console.log(this.contentItems);
  }
}
