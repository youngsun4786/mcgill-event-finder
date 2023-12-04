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

const showPostToggleAnimation = [
  trigger('overlayToggle', [
    state(
      'open',
      style({
        opacity: 0.25,
      })
    ),
    state(
      'closed',
      style({
        opacity: 0,
      })
    ),
    transition('open => closed', [animate('300ms ease-in')]),
    transition('closed => open', [animate('200ms ease-in')]),
  ]),
  trigger('fadeInOut', [
    state(
      'open',
      style({
        transform: 'translateY(0)',
        opacity: 1,
      })
    ),
    state(
      'closed',
      style({
        transform: 'translateY(30px)',
        opacity: 0,
      })
    ),
    transition('open => closed', [animate('300ms ease-in')]),
    transition('closed => open', [animate('200ms ease-in')]),
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
  @Input('date') date!: Record<string, string>;
  @Input('showViewPost') showViewPost: boolean = false;
  @Output() showViewPostChange = new EventEmitter<boolean>();

  closeShowPost() {
    this.showViewPost = false;
    this.showViewPostChange.emit(this.showViewPost);
  }
}
