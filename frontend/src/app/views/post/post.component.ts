import { Component, inject } from '@angular/core';
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
  route = inject(ActivatedRoute);
  postService = inject(PostService);
  storageService = inject(StorageService);
  posts: Post[] = [];

  constructor() // private postService: PostService,
  // private storageService: StorageService,
  // private route: ActivatedRoute
  {
    this.route.url.subscribe(([url]) => {
      const { path } = url;
      if (path === 'my-posts') {
        // filter posts by user posts
        this.postService.posts$.subscribe((posts: Post[]) => {
          this.posts = posts.filter((post: Post) => {
            return (
              post.author.email.toLowerCase() ===
              this.storageService.getUser().email.toLowerCase()
            );
          });
        });
      } else if (path === 'pinned-posts') {
        // filter posts by pinned post id
        // * /posts
      } else if (path == 'posts') {
        this.postService.posts$.subscribe((posts: Post[]) => {
          console.log(posts);
          this.posts = posts;
        });
      }
    });
  }
}
