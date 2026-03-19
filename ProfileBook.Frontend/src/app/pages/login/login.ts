import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  isLoading = false;

  constructor(private router: Router, private http: HttpClient) {}

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

    this.isLoading = true;

    // Call real API
    this.http.post<any>('http://localhost:5215/api/User/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        // Save to localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('role', response.role);
        localStorage.setItem('userId', response.userId.toString());

        this.isLoading = false;

        // Redirect based on role
        if (response.role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/feed']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Invalid username or password!';
      }
    });
  }
}