import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StrapiService } from '../../services/strapiservice';

@Component({
  selector: 'app-posts',
  imports: [RouterLink],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class Posts implements OnInit{
  constructor(private strapiService: StrapiService) {};
  contentItems: any[] = [];

  ngOnInit(): void {
    this.contentItems = this.strapiService.getBlogPosts().slice(0,3);
    this.contentItems.sort((a, b) => b.id - a.id);
    console.log(this.contentItems);
  };
}
