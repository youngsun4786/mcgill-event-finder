import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../../models/post.models';
import { PostItemComponent } from '../post-item/post-item.component';
import { SearchPipe } from '@app/pipes/search.pipe';
import { StorageService } from '@app/services/storage.service';
import { HttpClientModule } from '@angular/common/http';
import { UpcomingPostComponent } from '../upcoming-post/upcoming-post.component';
import { OrderByPipe } from '@app/pipes/order-by.pipe';
import { upcomingPipe } from '@app/pipes/upcoming.pipe';


@Component({
  selector: 'app-display-post',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    PostItemComponent,
    SearchPipe,
    UpcomingPostComponent,
    OrderByPipe,
    upcomingPipe,
  ],
  templateUrl: './display-post.component.html',
  styleUrl: './display-post.component.css',
})
export class DisplayPostComponent {
  @Input() allPosts!: Post[];
  @Input() path!: string;

  storageService = inject(StorageService);

  search: string = '';

  filters: { [field: string]: string[] } = {};

  ngOnInit() {
    // have checks for what router we're on to decide what filters to use

    // this.filters = {
    //   '_id' : ['656e89d38ef323d1205dec0d', '656e552c16c5ffabb3ddcbbc']
    // }

    // for checking user posts
    this.filters = {
      // 'author.email': [this.storageService.getUser().email],
    };
  }

  createFormattedDate(month: number, year: number): string {
    const date = new Date(year, month, 1); // Using 1 for day, as we're interested in the month and year
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  
}
