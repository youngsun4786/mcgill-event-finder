import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DisplayPostComponent } from './components/display-post/display-post.component';
import { Post } from '../../models/post.models';
import { PostService } from '../../services/post.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { Observable, map, filter } from 'rxjs';
@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, DisplayPostComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  router = inject(Router);
  postService = inject(PostService);
  storageService = inject(StorageService);
  posts: Observable<Post[]> = this.postService.getPosts();
  posts$: Post[] = [];

  // filteredPosts$ = this.posts.pipe(
  //   map((posts: Post[]) => {
  //     return posts.filter((post: Post) => {
  //       return this.postService.emailFilter
  //         ? post.author.email.toLowerCase() ===
  //             this.storageService.getUser().email.toLowerCase()
  //         : true;
  //     });
  //   })
  // );
  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.posts.subscribe((posts: Post[]) => {
      this.posts$ = posts;
    });
  }
}
