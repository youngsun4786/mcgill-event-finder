import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../../models/post.models';
import { PostItemComponent } from '../post-item/post-item.component';

@Component({
  selector: 'app-display-post',
  standalone: true,
  imports: [CommonModule, PostItemComponent],
  templateUrl: './display-post.component.html',
  styleUrl: './display-post.component.css',
})
export class DisplayPostComponent {
  @Input() allPosts!: Post[];
}
