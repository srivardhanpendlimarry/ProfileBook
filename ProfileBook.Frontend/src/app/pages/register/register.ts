import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router) {}

  onRegister() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.username) {
      this.errorMessage = 'Username is required!';
      return;
    }
    if (this.username.length < 3) {
      this.errorMessage = 'Username must be at least 3 characters!';
      return;
    }
    if (!this.email) {
      this.errorMessage = 'Email is required!';
      return;
    }
    if (!this.email.includes('@')) {
      this.errorMessage = 'Please enter a valid email!';
      return;
    }
    if (!this.password) {
      this.errorMessage = 'Password is required!';
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters!';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    // Sprint II: connect to API
    this.successMessage = 'Registration successful! Redirecting to login...';
    setTimeout(() => this.router.navigate(['/login']), 2000);
  }
}