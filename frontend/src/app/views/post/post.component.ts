import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayPostComponent } from './components/display-post/display-post.component';
import { Post } from '../../models/post.models';
import { PostService } from '../../services/post.service';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, DisplayPostComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  // route = inject(ActivatedRoute);
  // postService = inject(PostService);
  // storageService = inject(StorageService);
  posts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private postService: PostService
  ) {
    this.route.url.subscribe(([url]) => {
      const { path } = url;
      if (path === 'my-posts') {
        // filter posts by user posts
        this.postService.posts$.subscribe((posts: Post[]) => {
          this.posts = posts.filter((post: Post) => {
            // console.log(post);
            return (
              post.author.email.toLowerCase() ===
              this.storageService.getUser().email.toLowerCase()
            );
          });
        });
      } else if (path === 'pinned-posts') {
        // filter posts by pinned post id
      } else {
        this.postService.posts$.subscribe((posts: Post[]) => {
          this.posts = posts;
          // console.log(posts);
        });
      }
    });
  }
}
