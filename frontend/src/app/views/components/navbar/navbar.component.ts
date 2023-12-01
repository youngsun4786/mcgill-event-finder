import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  storageService = inject(StorageService);
  platformId = inject(PLATFORM_ID);
  isAuth = false;
  name?: string;
  role?: string;

  constructor(private router: Router) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.storageService.loggedIn()) {
        this.isAuth = true;
        this.name = this.storageService.getUser()?.name;
        this.role = this.storageService.getUser()?.role;
      }
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        localStorage.clear();
        this.isAuth = false;
        this.authService.currentUserSignal.set(null);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        localStorage.clear();
        this.isAuth = false;
        this.authService.currentUserSignal.set(null);
        console.log(err);
      },
    });
  }
}
