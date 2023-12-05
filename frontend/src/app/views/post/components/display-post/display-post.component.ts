import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Post } from '../../../../models/post.models';
import { PostItemComponent } from '../post-item/post-item.component';
import { SearchPipe } from '@app/pipes/search.pipe';
import { StorageService } from '@app/services/storage.service';


@Component({
  selector: 'app-display-post',
  standalone: true,
  imports: [CommonModule, HttpClientModule, PostItemComponent, SearchPipe],
  templateUrl: './display-post.component.html',
  styleUrl: './display-post.component.css',
})
export class DisplayPostComponent {
  @Input() allPosts!: Post[];

  storageService = inject(StorageService);

  search : string = '';

  filters : { [field: string]: string[] } = { }

  ngOnInit() {
    // have checks for what router we're on to decide what filters to use

    // this.filters = {
    //   '_id' : ['656e89d38ef323d1205dec0d', '656e552c16c5ffabb3ddcbbc']
    // }

    // for checking user posts
    this.filters = {
      'author.email' : [this.storageService.getUser().email]
    }
  }
}
