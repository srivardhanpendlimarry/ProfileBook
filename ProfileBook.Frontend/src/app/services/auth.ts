import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Register user
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/register`, data);
  }

  // Login user
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, data);
  }

  // Save token to local storage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Get token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Get current user role
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  // Save user role
  saveRole(role: string): void {
    localStorage.setItem('role', role);
  }

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}