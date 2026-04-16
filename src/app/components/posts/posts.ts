import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StrapiService } from '../../services/strapiservice';
import { empty, shareReplay, Subject } from 'rxjs';

@Component({
  selector: 'app-posts',
  imports: [RouterLink],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class Posts {
  constructor(private strapiService: StrapiService) {}
  contentItems: any[] = [];

  ngOnInit(): void {
    this.contentItems = this.strapiService.getBlogPosts().slice(0,3);
  }
}
