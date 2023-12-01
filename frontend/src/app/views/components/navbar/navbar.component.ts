import { Component, Injectable, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from 'express';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [StorageService, AuthService],
})
export class NavbarComponent {
  //   storageService = inject(StorageService);
  //   authService = inject(AuthService);
  //   router = inject(Router);
  //   loggedIn = false;
  //   name?: string;
  //   role?: string;
  //   ngOnInit(): void {
  //     this.loggedIn = this.storageService.loggedIn();
  //     if (this.loggedIn) {
  //       const user = this.storageService.getUser();
  //       this.name = user.name;
  //       this.role = user.role;
  //     }
  //   }
  //   logout(): void {
  //     this.authService.logout().subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.storageService.clean();
  //         this.router.navigateByUrl('/');
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  //   }
}
