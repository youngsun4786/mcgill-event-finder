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
import { httpOptions } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  storageService = inject(StorageService);
  httpClient = inject(HttpClient);
  loginForm: FormGroup;

  loggedIn = false;
  loginFailed = false;
  loading = false;
  error: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.storageService.loggedIn()) {
      this.loggedIn = true;
    }
  }

  loginUser(email: string, password: string) {
    const user = {
      email: email,
      password: password,
    };
    this.httpClient
      .post(`http://localhost:8000/auth/login`, user, httpOptions)
      .subscribe({
        next: (user: any) => {
          this.storageService.saveUser(user);
          localStorage.setItem('token', user.accessToken);
          this.loginFailed = false;
          this.loggedIn = true;
          this.router.navigateByUrl('/posts');
        },
        error: (error: any) => {
          // remove the quotes from the error message
          alert(error.error.toString().replace(/['"]+/g, ''));
          this.loginFailed = true;
          console.error(error);
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
