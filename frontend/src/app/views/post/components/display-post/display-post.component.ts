import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Post } from '../../../../models/post.models';

@Component({
  selector: 'app-display-post',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './display-post.component.html',
  styleUrl: './display-post.component.css',
})
export class DisplayPostComponent {
  @Input() allPosts!: Post[];
}
