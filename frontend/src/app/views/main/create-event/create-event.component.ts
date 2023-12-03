import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../../models/post.models';
import { MatSelectModule } from '@angular/material/select';

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
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule],
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

  }

  closeCreateEvent() {
    this.showCreateEvent = false;
    this.showCreateEventChange.emit(this.showCreateEvent);
  }

  onEventCreate() {

  }
}
