import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '@app/models/post.models';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-post-item-details',
  standalone: true,
  imports: [CommonModule, NgSelectModule],
  templateUrl: './post-item-details.component.html',
  styleUrl: './post-item-details.component.css',
})
export class PostItemDetailsComponent {
  @Input('post') post!: Post;
  @Input('date') date!: Record<string, string>;
  @Input('showViewPost') showViewPost: boolean = false;
  @Output() showViewPostChange = new EventEmitter<boolean>();
}
