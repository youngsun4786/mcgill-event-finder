import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DisplayPostComponent } from './components/display-post/display-post.component';
import { Post } from '../../models/post.models';
import { PostService } from '../../services/post.service';
import { StorageService } from '../../services/storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, DisplayPostComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  router = inject(Router);
  postService = inject(PostService);
  httpClient = inject(HttpClient);
  posts: Post[] = [];

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
}
