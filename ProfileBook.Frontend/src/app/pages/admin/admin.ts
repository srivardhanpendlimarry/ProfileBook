import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  users: any[] = [];
  pendingPosts: any[] = [];
  reports: any[] = [];
  private apiUrl = 'http://localhost:5215/api';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    const role = localStorage.getItem('role');
    if (role !== 'Admin') {
      this.router.navigate(['/feed']);
    }
  }

  ngOnInit() {
    this.loadUsers();
    this.loadPendingPosts();
    this.loadReports();
  }

  loadUsers() {
    this.http.get<any[]>(`${this.apiUrl}/User`).subscribe({
      next: (data) => {
        this.users = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.log('Error:', err)
    });
  }

  loadPendingPosts() {
    this.http.get<any[]>(`${this.apiUrl}/Post/pending`).subscribe({
      next: (data) => {
        this.pendingPosts = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.log('Error:', err)
    });
  }

  loadReports() {
    this.http.get<any[]>(`${this.apiUrl}/Report`).subscribe({
      next: (data) => {
        this.reports = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.log('Error loading reports')
    });
  }

  approvePost(postId: number) {
    this.http.put(`${this.apiUrl}/Post/approve/${postId}`, {})
      .subscribe({
        next: () => {
          alert('Post approved successfully!');
          this.loadPendingPosts();
        },
        error: (err) => alert('Error approving post!')
      });
  }

  rejectPost(postId: number) {
    this.http.put(`${this.apiUrl}/Post/reject/${postId}`, {})
      .subscribe({
        next: () => {
          alert('Post rejected!');
          this.loadPendingPosts();
        },
        error: (err) => alert('Error rejecting post!')
      });
  }

  deleteUser(id: number) {
    this.http.delete(`${this.apiUrl}/User/${id}`)
      .subscribe({
        next: () => {
          alert('User deleted successfully!');
          this.loadUsers();
        },
        error: (err) => alert('Error deleting user!')
      });
  }

  editUser(user: any) {
    const newUsername = prompt('Enter new username:', user.username);
    if (newUsername) {
      this.http.put(`${this.apiUrl}/User/${user.userId}`,
        { username: newUsername, email: user.email, password: '' })
        .subscribe({
          next: () => {
            alert('User updated successfully!');
            this.loadUsers();
          },
          error: (err) => alert('Error updating user!')
        });
    }
  }

  deleteReport(id: number) {
    this.http.delete(`${this.apiUrl}/Report/${id}`)
      .subscribe({
        next: () => {
          alert('Report dismissed!');
          this.loadReports();
        },
        error: (err) => alert('Error dismissing report!')
      });
  }
}