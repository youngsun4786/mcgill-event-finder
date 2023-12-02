import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../../models/post.models';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-my-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-post.component.html',
  styleUrl: './my-post.component.css',
})
export class MyPostComponent implements OnInit {
  router = inject(Router);
  storageService = inject(StorageService);
  @Input() allPosts!: Post[];

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getMyPosts();
      }
    });
  }

  getMyPosts(): Post[] {
    return this.allPosts.filter(
      (post) => post.author.email === this.storageService.getUser().email
    );
  }
}
