import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '@app/models/post.models';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { MatNativeDateModule } from '@angular/material/core';
import { PostService } from '@app/services/post.service';
import { StorageService } from '@app/services/storage.service';

const showPostToggleAnimation = [
  trigger('overlayToggle', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('200ms ease-in', style({ opacity: 0.25 })),
    ]),
    transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
  ]),
  trigger('modalToggle', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      animate(
        '200ms ease-in',
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
    ]),
    transition(':leave', [
      animate(
        '300ms ease-in',
        style({ opacity: 0, transform: 'translateY(30px)' })
      ),
    ]),
  ]),
];

@Component({
  selector: 'app-post-item-details',
  standalone: true,
  imports: [
    CommonModule,
    NgSelectModule,
    MatDatepickerModule,
    NgClickOutsideDirective,
    MatNativeDateModule,
  ],
  animations: showPostToggleAnimation,
  templateUrl: './post-item-details.component.html',
  styleUrl: './post-item-details.component.css',
})
export class PostItemDetailsComponent {
  @Input('post') post!: Post;
  @Input('startDate') startDate!: Record<string, string>;
  @Input('endDate') endDate!: Record<string, string>;
  @Input('showViewPost') showViewPost: boolean = false;
  @Output() showViewPostChange = new EventEmitter<boolean>();
  currentUserEmail!: string;
  constructor(
    private postService: PostService,
    private storageService: StorageService
  ) {
    this.currentUserEmail = this.storageService.getUser().email.toLowerCase();
  }

  editPost(id: string): void {
    
  }

  deletePost(id: string): void {
    if (!id) {
      alert('This post does not exist');
      return;
    }
    this.postService.deletePostById(id).subscribe({
      next: () => {
        this.postService.getPosts();
        this.closeShowPost();
      },
    });
  }

  closeShowPost() {
    this.showViewPost = false;
    this.showViewPostChange.emit(this.showViewPost);
  }
}
