import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  onLogin() {
    this.errorMessage = '';

    if (!this.username) {
      this.errorMessage = 'Username is required!';
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

    // Check if admin or user
    if (this.username === 'admin' && this.password === 'admin123') {
      localStorage.setItem('token', 'admin-token-123');
      localStorage.setItem('username', this.username);
      localStorage.setItem('role', 'Admin');
      this.router.navigate(['/admin']);
    } else {
      localStorage.setItem('token', 'user-token-123');
      localStorage.setItem('username', this.username);
      localStorage.setItem('role', 'User');
      this.router.navigate(['/feed']);
    }
  }
}