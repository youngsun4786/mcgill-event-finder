import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  hasErrors: boolean = false;

  constructor(
    private fb : FormBuilder,
  ) {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.registerForm.value.password !== this.registerForm.value.password2 || this.registerForm.invalid) {
      this.hasErrors = true;
      return;
    }
    this.hasErrors = false;
    console.log('Form submitted');
  }
}
