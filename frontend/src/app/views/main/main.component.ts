import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor() { }

  ngOnInit(): void {

  }

  createEvent() {
    this.createEventOpen = !this.createEventOpen;
  }
}
