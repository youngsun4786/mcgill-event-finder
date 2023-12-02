import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';
import { RouterModule } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTabsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  postService = inject(PostService);
  router = inject(Router);
  storageService = inject(StorageService);
  platformId = inject(PLATFORM_ID);
  isAuth = false;
  name?: string;
  role?: string;
  links: any[] = [
    { label: 'All Posts', link: '/posts', index: 0 },
    { label: 'My Posts', link: '/my-posts', index: 1 },
    { label: 'Create Posts', link: '/create-post', index: 2 },
  ];
  activeLinkIndex = -1;

  constructor() {}
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.links.indexOf(
        this.links.find((tab) => tab.link === this.router.url)
      );
    });
    if (isPlatformBrowser(this.platformId)) {
      if (this.storageService.loggedIn()) {
        this.isAuth = true;
        this.name = this.storageService.getUser()?.name;
        this.role = this.storageService.getUser()?.role;
      }
    }
  }

  FilterByEmail() {
    console.log(this.postService.emailFilter);
    return (this.postService.emailFilter = true);
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
