import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '@app/models/post.models';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css',
})
export class PostItemComponent {
  @Input() post!: Post;
  
}
