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
    this.contentItems = this.strapiService.getBlogPosts();
  }
}
