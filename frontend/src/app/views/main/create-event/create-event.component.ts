import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventStatusType, Post } from '../../../models/post.models';
import { DateRange, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { User } from '@app/models/user.models';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '@app/services/auth.service';

const createEventToggleAnimation = [
	trigger('overlayToggle', [
		state('open', style({
			opacity: 0.25
		})),
		state('closed', style({
			opacity: 0
		})),
		transition('open => closed', [
			animate('300ms ease-in')
		]),
		transition('closed => open', [
			animate('200ms ease-in')
		])
	]),
	trigger('fadeInOut', [
    state('open', style({
			transform: 'translateY(0)',
      opacity: 1
		})),
		state('closed', style({
			transform: 'translateY(30px)',
      opacity: 0
		})),
		transition('open => closed', [
			animate('300ms ease-in')
		]),
		transition('closed => open', [
			animate('200ms ease-in')
		])
  ])
]

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgClickOutsideDirective,
  ],
  animations: createEventToggleAnimation,
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  @Input('showCreateEvent') showCreateEvent: boolean = false;
  @Output() showCreateEventChange = new EventEmitter<boolean>();
  httpClient = inject(HttpClient);

  newEventForm: FormGroup;
  eventDayType: string = 'singleday';

  tags: string[] = ['tag1', 'tag2', 'tag3'];

  calendar1Open: boolean = false;
  calendar2Open: boolean = false;
  selectedSingleDate: Date | null = null;
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;
  minDate: Date = new Date();
  maxDate: Date = new Date();

  isIncomplete: boolean = false;
  timeError: boolean = false;

  constructor(fb : FormBuilder) {
    this.newEventForm = fb.group({
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
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 30);
  }

  calendarToggle(num : number = 1) {
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
      this.newEventForm.patchValue({
        startDate: date.toDateString(),
        endDate: date.toDateString()
      });
      this.calendarToggle(1);
    } else if (type === 'start') {
      this.selectedStartDate = date;
      if (this.selectedEndDate && this.selectedEndDate < this.selectedStartDate) {
        this.selectedEndDate = null;
      }
      this.newEventForm.patchValue({
        startDate: date.toDateString(),
        endDate: this.selectedEndDate ? this.selectedEndDate.toDateString() : ''
      });
      this.calendarToggle(1);
    } else if (type === 'end') {
      this.selectedEndDate = date;
      this.newEventForm.patchValue({
        endDate: date.toDateString()
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
      console.log(this.newEventForm.controls['startTime'].value)
      return this.newEventForm.controls['startTime'].value || '00:00';
    }

    if (t === 'max') {
      return this.newEventForm.controls['endTime'].value || '23:59';
    }
  }

  // TODO: prevent date from being before startdate

  closeCreateEvent() {
    this.showCreateEvent = false;
    this.isIncomplete = false;
    this.showCreateEventChange.emit(this.showCreateEvent);
  }

  onEventCreate() {
    this.isIncomplete = !this.newEventForm.valid;
    this.timeError = this.eventDayType == 'singleday' && (this.newEventForm.controls['startTime'].value > this.newEventForm.controls['endTime'].value);

    if (this.isIncomplete || this.timeError) return;


    let newPost: Post = {
      title: this.newEventForm.controls['title'].value,
      location: this.newEventForm.controls['location'].value,
      startDate: new Date(this.newEventForm.controls['startDate'].value + ' ' + this.newEventForm.controls['startTime'].value),
      endDate: new Date(this.newEventForm.controls['endDate'].value + ' ' + this.newEventForm.controls['endTime'].value),
      createdAt: new Date(),
      tags: this.newEventForm.controls['tags'].value,
      status: EventStatusType.SCHEDULED,
      author: new Object() as User,
    }
    this.createEvent(newPost);
  }

  createEvent(post: Post) {
    this.httpClient
      .post(`http://localhost:8000/posts`, post, httpOptions)
      .subscribe({
        next: () => {
          this.closeCreateEvent();
        },
        error: (error: any) => {
          alert(error.toString().replace(/['"]+/g, ''));
          console.error(error);
        },
      });
  }
}
