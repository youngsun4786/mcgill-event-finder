import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEventComponent } from './create-event/create-event.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, CreateEventComponent, MatButtonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  createEventOpen: boolean = false;

  constructor() {}

  createEvent() {
    this.createEventOpen = !this.createEventOpen;
  }
}
