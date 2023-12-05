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
  posts: Post[] = [];
  path!: string;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private postService: PostService
  ) {
    console.count('PostComponent:constructor');
    postService.initialize();

    const filterPostsByCurrentUser = (post: Post) => {
      // ! post.author can be null if user is deleted
      if (!post.author!.email) {
        return false;
      }
      return (
        post.author!.email.toLowerCase() ===
        this.storageService.getUser().email.toLowerCase()
      );
    };

    const filterPostsByPinnedPostId = (post: Post) => {
      // TODO: implement user pins, and update the filter
      // return this.storageService.getUser().pins.includes(post._id);
      return true;
    };

    this.route.url.subscribe(([url]) => {
      const { path } = url;
      this.path = path;
      if (path === 'my-posts') {
        // filter posts by user posts
        this.postService.posts$.subscribe((posts: Post[]) => {
          this.posts = posts.filter(filterPostsByCurrentUser);
        });
      } else if (path === 'pinned-posts') {
        // filter posts by pinned post id
        this.postService.posts$.subscribe((posts: Post[]) => {
          this.posts = posts.filter(filterPostsByPinnedPostId);
        });
      } else {
        // display all posts
        this.postService.posts$.subscribe((posts: Post[]) => {
          this.posts = posts;
        });
      }
    });
  }
}
