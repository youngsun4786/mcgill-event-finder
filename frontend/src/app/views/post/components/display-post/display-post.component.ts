import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Post } from '../../../../models/post.models';

@Component({
  selector: 'app-display-post',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './display-post.component.html',
  styleUrl: './display-post.component.css',
})
export class DisplayPostComponent implements OnInit {
  httpClient = inject(HttpClient);
  posts: Post[] = [];

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.httpClient
      .get('http://localhost:8000/posts')
      .subscribe((posts: any) => {
        this.posts = posts;

        console.log(posts);
      });
  }
}
