import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventStatusType, Post } from '@app/models/post.models';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '@app/services/storage.service';
import { PostService } from '@app/services/post.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { start } from 'repl';

@Component({
  selector: 'app-post-item-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgSelectModule,
    NgClickOutsideDirective
  ],
  templateUrl: './post-item-edit.component.html',
  styleUrl: './post-item-edit.component.css'
})
export class PostItemEditComponent {
  @Input('isEdit') isEdit!: boolean;
  @Output() isEditChange = new EventEmitter<boolean>();
  @Input('post') selectedPost!: Post;

  httpClient = inject(HttpClient);
  storageService = inject(StorageService);
  postService = inject(PostService);

  editEventForm: FormGroup;
  eventDayType: string = 'singleday';

  tags: string[] = ['Academic', 'Social', 'Online', 'In-Person', 'Entertainment'];

  calendar1Open: boolean = false;
  calendar2Open: boolean = false;
  selectedSingleDate: Date | null = null;
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;
  minDate: Date = new Date();
  maxDate: Date = new Date();

  isIncomplete: boolean = false;
  timeError: boolean = false;

  statusDropdownOpen: boolean = false;
  eventStatus: EventStatusType = EventStatusType.SCHEDULED;
  statuses: EventStatusType[] = [];

  constructor(fb: FormBuilder) {
    this.editEventForm = fb.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required],
      location: ['', Validators.required],
      description: [''],
      tags: [''],
    });
  }

  ngOnInit() {
    this.statuses = Object.values(EventStatusType);

    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 30);
    this.eventStatus = this.selectedPost.status;

    const startDate = new Date(this.selectedPost.startDate);
    const endDate = new Date(this.selectedPost.endDate);
    const startTime = startDate.getHours() + ':' + startDate.getMinutes();
    const endTime = endDate.getHours() + ':' + endDate.getMinutes();

    // if start date and end date are different, set eventDayType to 'multiday'
    if (startDate.toDateString() !== endDate.toDateString()) {
      this.eventDayType = 'multiday';
    }

    // fill out form with post data
    this.editEventForm.patchValue({
      title: this.selectedPost.title,
      startDate: startDate.toDateString(),
      startTime: startTime.length === 4 ? '0' + startTime : startTime,
      endDate: endDate.toDateString(),
      endTime: endTime.length === 4 ? '0' + endTime : endTime,
      location: this.selectedPost.location,
      description: this.selectedPost.description,
      tags: this.selectedPost.tags,
    });

    console.log(this.editEventForm.value);
  }

  calendarToggle(num: number = 1) {
    if (num == 1) {
      this.calendar1Open = !this.calendar1Open;
    } else if (num == 2) {
      this.calendar2Open = !this.calendar2Open;
    }
  }

  changeEventDateType(type: string) {
    this.eventDayType = type;
    this.calendar1Open = false;
    this.calendar2Open = false;
  }

  onDateSelect(date: Date, type: string) {
    if (type === 'single') {
      this.selectedSingleDate = date;
      this.selectedStartDate = date;
      this.selectedEndDate = date;
      this.editEventForm.patchValue({
        startDate: date.toDateString(),
        endDate: date.toDateString(),
      });
      this.calendarToggle(1);
    } else if (type === 'start') {
      this.selectedStartDate = date;
      if (
        this.selectedEndDate &&
        this.selectedEndDate < this.selectedStartDate
      ) {
        this.selectedEndDate = null;
      }
      this.editEventForm.patchValue({
        startDate: date.toDateString(),
        endDate: this.selectedEndDate
          ? this.selectedEndDate.toDateString()
          : '',
      });
      this.calendarToggle(1);
    } else if (type === 'end') {
      this.selectedEndDate = date;
      this.editEventForm.patchValue({
        endDate: date.toDateString(),
      });
      this.calendarToggle(2);
    }
  }

  getLaterDate() {
    if (this.selectedStartDate) {
      let laterDate = new Date(this.selectedStartDate);
      laterDate.setDate(laterDate.getDate() + 1);
      return laterDate;
    }
    return new Date();
  }

  getTime(t: string) {
    if (t === 'min') {
      return this.editEventForm.controls['startTime'].value || '00:00';
    }

    if (t === 'max') {
      return this.editEventForm.controls['endTime'].value || '23:59';
    }
  }

  closeEditEvent(): void {
    this.isEditChange.emit(false);
  }

  onEventEdit() {
    this.isIncomplete = !this.editEventForm.valid;
    this.timeError =
      this.eventDayType == 'singleday' &&
      this.editEventForm.controls['startTime'].value >
        this.editEventForm.controls['endTime'].value;

    if (this.isIncomplete || this.timeError) return;

    let newPost: Post = {
      title: this.editEventForm.controls['title'].value,
      location: this.editEventForm.controls['location'].value,
      startDate: new Date(
        this.editEventForm.controls['startDate'].value +
          ' ' +
          this.editEventForm.controls['startTime'].value
      ),
      endDate: new Date(
        this.editEventForm.controls['endDate'].value +
          ' ' +
          this.editEventForm.controls['endTime'].value
      ),
      createdAt: new Date(),
      tags: this.editEventForm.controls['tags'].value,
      status: this.eventStatus,
      email: this.storageService.getUser().email,
    };
    this.createEvent(newPost);
  }

  createEvent(updatedPost: Post) {
    this.postService.updatePostById(this.selectedPost._id!, updatedPost).subscribe({
      next: (post: Post) => {
        this.closeEditEvent();
        this.postService.getPosts();
        console.log(post);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  onDropdownMouseEnter(event: any) {
    this.statusDropdownOpen = true;

  }

  onDropdownMouseLeave(event: any) {
    this.statusDropdownOpen = false;
  }

  changeStatus(status: EventStatusType) {
    this.eventStatus = status;
    this.statusDropdownOpen = false;
  }
}
