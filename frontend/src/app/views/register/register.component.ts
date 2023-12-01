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

  hasErrors: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
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
    if (
      this.registerForm.value.password !==
        this.registerForm.value.passwordConfirmation ||
      this.registerForm.invalid
    ) {
      this.hasErrors = true;
      return;
    }
    this.hasErrors = false;
    this.registerUser(this.registerForm.value as User);
  }
}
