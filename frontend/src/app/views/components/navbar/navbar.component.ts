import { Component, Injectable, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  name?: string;
  role?: string;

  constructor(private router: Router) {
    if (this.authService.currentUserSignal()) {
      this.name = this.authService.currentUserSignal()?.name;
      console.log(this.name);
      this.role = this.authService.currentUserSignal()?.role;
      console.log(this.role);
    }
  }
  ngOnInit(): void {}

  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log(response);
        sessionStorage.clear();
        this.authService.currentUserSignal.set(null);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
