import { inject, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService, httpOptions } from '../../services/auth.service';
import { User } from '../../models/user.models';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  httpClient = inject(HttpClient);
  loginForm: FormGroup;

  loading = false;
  error: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // if (this.storageService.loggedIn()) {
    //   this.loggedIn = true;
    // }
  }

  loginUser(email: string, password: string) {
    const user = {
      email: email,
      password: password,
    };
    this.httpClient
      .post<{ user: User }>(
        `http://localhost:8000/auth/login`,
        user,
        httpOptions
      )
      .subscribe({
        next: (user: any) => {
          sessionStorage.setItem('token', user.accessToken);
          this.authService.currentUserSignal.set(user.user);
          this.router.navigateByUrl('/posts');
        },
        error: (error: any) => {
          // remove the quotes from the error message
          alert(error.toString().replace(/['"]+/g, ''));
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
