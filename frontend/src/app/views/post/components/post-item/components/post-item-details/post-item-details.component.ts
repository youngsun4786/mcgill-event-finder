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
import { User } from '@app/models/user.models';
import { PostItemEditComponent } from './post-item-edit/post-item-edit.component';

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
      style({ opacity: 0 }),
      animate(
        '200ms ease-in',
        style({ opacity: 1 })
      ),
    ]),
    transition(':leave', [
      animate(
        '300ms ease-in',
        style({ opacity: 0 })
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
    PostItemEditComponent,
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
  isEditPost: boolean;
  pinned: boolean; // Indicates if the item is pinned or not

  deleteConfirmOpen: boolean = false;

  constructor(
    private postService: PostService,
    private storageService: StorageService
  ) {
    this.isEditPost = false;
    this.pinned = false;

    this.currentUserEmail = this.storageService.getUser().email.toLowerCase();
  }

  ngOnInit(): void {
    this.storageService.getUser().pins!.includes(this.post._id!)
      ? (this.pinned = true)
      : (this.pinned = false);
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
        this.deleteConfirmOpen = false;
      },
    });
  }

  togglePin() {
    this.pinned = !this.pinned;
  }

  closeShowPost() {
    this.showViewPost = false;
    this.isEditPost = false;
    // * if pinned and pins array does not contain post id, push it
    // * and update user in token
    if (
      !this.storageService.getUser().pins.includes(this.post._id!) &&
      this.pinned
    ) {
      const pins = this.storageService.getUser().pins!;
      pins.push(this.post._id!);
      this.storageService.saveUser({
        name: this.storageService.getUser().name,
        email: this.storageService.getUser().email,
        role: this.storageService.getUser().role,
        pins: pins,
      } as User);
    }

    // * if unpinned and pins array contains post id, remove it
    // * and update user in token
    if (
      this.storageService.getUser().pins.includes(this.post._id!) &&
      !this.pinned
    ) {
      const pins = this.storageService.getUser().pins!;
      pins.splice(pins.indexOf(this.post._id!), 1);
      this.storageService.saveUser({
        name: this.storageService.getUser().name,
        email: this.storageService.getUser().email,
        role: this.storageService.getUser().role,
        pins: pins,
      } as User);
    }

    this.showViewPostChange.emit(this.showViewPost);
  }
}
