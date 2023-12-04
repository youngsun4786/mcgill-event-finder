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
    transition(':enter', [
      style({ opacity: 0 }),
      animate('200ms ease-in', style({ opacity: 0.25 }))
    ]),
    transition(':leave', [
      animate('300ms ease-in', style({ opacity: 0 }))
    ])
	]),
	trigger('modalToggle', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      animate('200ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
    ]),
    transition(':leave', [
      animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(30px)' }))
    ])
  ])
]

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

  closeShowPost() {
    console.log('wahoo' + this.showViewPost)
    this.showViewPost = false;
    this.showViewPostChange.emit(this.showViewPost);
  }
}
