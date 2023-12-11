import { inject, Component, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService, httpOptions } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { User } from '../../models/user.models';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  httpClient = inject(HttpClient);
  platformId = inject(PLATFORM_ID);
  storageService = inject(StorageService);
  loginForm: FormGroup;

  loading = false;
  error: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginUser(email: string, password: string) {
    const user = {
      email: email,
      password: password,
    };
    this.httpClient
      .post<{ user: User }>(
        `https://mcevent-backend.onrender.com/auth/login`,
        user,
        httpOptions
      )
      .subscribe({
        next: (user: any) => {
          localStorage.setItem('token', user.accessToken);
          this.storageService.saveUser(user.user);
          this.authService.currentUserSignal.set(user.user);
          if (isPlatformBrowser(this.platformId)) {
            this.router.navigateByUrl('/posts').then(() => {
              window.location.reload();
            });
          }
        },
        error: (error: any) => {
          // remove the quotes from the error message
          alert(error.message.toString().replace(/['"]+/g, ''));
          console.error(error.message);
          this.authService.currentUserSignal.set(null);
        },
      });
  }

  onSubmit() {
    if (
      !this.loginForm.value.email ||
      !this.loginForm.value.password ||
      this.loginForm.invalid
    ) {
      this.error = true;
      return;
    }
    this.error = false;
    this.loginUser(this.loginForm.value.email, this.loginForm.value.password);
  }
}
