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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
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

  ngOnInit() {}

  loginUser(email: string, password: string) {
    const user = {
      email: email,
      password: password,
    };
    this.httpClient
      .post(`http://localhost:8000/auth/login`, user, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          alert(error.error.toString().replace(/['"]+/g, ''));
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
    console.log('Form submitted');
  }
}
