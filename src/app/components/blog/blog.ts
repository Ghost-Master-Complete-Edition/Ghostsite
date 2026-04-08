import { Component } from '@angular/core';
import { StrapiService } from '../../services/strapiservice';

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {
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
    this.contentItems.sort((a, b) => new Date(b.date1).getTime() - new Date(a.date1).getTime());
  }
}
