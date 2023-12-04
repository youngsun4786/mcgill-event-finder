import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../../models/post.models';
import { DateRange, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgClickOutsideDirective } from 'ng-click-outside2';


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
    NgClickOutsideDirective
  ],
  animations: createEventToggleAnimation,
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  @Input('showCreateEvent') showCreateEvent: boolean = false;
  @Output() showCreateEventChange = new EventEmitter<boolean>();

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

  constructor(fb : FormBuilder) {
    this.newEventForm = fb.group({
      title: ['', Validators.required],
      startDate: [''],
      startTime: [''],
      endDate: [''],
      endTime: [''],
      location: [''],
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

  // TODO: prevent date from being before startdate

  closeCreateEvent() {
    this.showCreateEvent = false;
    this.showCreateEventChange.emit(this.showCreateEvent);
  }

  onEventCreate() {

  }
}
