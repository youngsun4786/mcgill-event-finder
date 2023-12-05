import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '@app/models/post.models';
import { MatButtonModule } from '@angular/material/button';
import { PostItemDetailsComponent } from './components/post-item-details/post-item-details.component';
@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule, PostItemDetailsComponent],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css',
})
export class PostItemComponent implements OnInit {
  @Input() post!: Post;
  showPostOpen: boolean = false;
  startDate!: Record<string, string>;
  endDate!: Record<string, string>;

  ngOnInit(): void {
    this.startDate = this.formatISODate(this.post.startDate);
    this.endDate = this.formatISODate(this.post.endDate);
  }

  formatISODate(inputDate: Date): Record<string, string> {
    const date = new Date(inputDate);

    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    });

    const dateParts = formattedDate.split(', ');
    const monthDayYear = dateParts[0].split(' ');

    const year = parseInt(dateParts[1]);
    const month = monthDayYear[0];
    const day = parseInt(monthDayYear[1], 10);
    const time = dateParts[2];

    return {
      month: month.toString(),
      day: day.toString(),
      year: year.toString(),
      time: time,
    };
  }

  showPost() {
    this.showPostOpen = !this.showPostOpen;
  }
}
