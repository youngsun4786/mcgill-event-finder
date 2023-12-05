import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { User } from '../../models/user.models';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService, httpOptions } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})

export class RegisterComponent {
  httpClient = inject(HttpClient);
  authService = inject(AuthService);
  registerForm: FormGroup;

  loading = false;
  hasErrors: boolean = false;
  passwordError: boolean = false;
  passwordMismatch: boolean = false;
  emailWarning: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)]],
      passwordConfirmation: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  registerUser(user: User) {
    this.httpClient
      .post(`http://localhost:8000/auth/register`, user, httpOptions)
      .subscribe({
        next: () => {
          this.authService.currentUserSignal.set(user);
          this.router.navigateByUrl('/login');
        },
        error: (error: any) => {
          alert(error.toString().replace(/['"]+/g, ''));
          console.error(error);
        },
      });
  }

  onSubmit() {
    this.emailCheck();
    this.passwordCheck();
    this.passwordMatchCheck();
    if (this.passwordMismatch || this.registerForm.invalid) {
      this.hasErrors = true;
      return;
    }
    this.hasErrors = false;
    this.registerUser(this.registerForm.value as User);
  }

  emailCheck(){
    this.emailWarning = this.registerForm.controls['email'].invalid
  }

  passwordCheck(){
    this.passwordError = this.registerForm.controls['password'].invalid
  }

  passwordMatchCheck(){
    this.passwordMismatch = this.registerForm.controls['password'].value !== this.registerForm.controls['passwordConfirmation'].value
  }
}
