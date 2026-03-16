import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
  users = [
    { id: 1, username: 'john_doe', email: 'john@example.com', role: 'User', status: 'Active' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, username: 'bob_wilson', email: 'bob@example.com', role: 'User', status: 'Reported' },
  ];

  constructor(private router: Router) {
    const role = localStorage.getItem('role');
    if (role !== 'Admin') {
      this.router.navigate(['/feed']);
    }
  }

  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
    alert('User deleted successfully!');
  }

  editUser(user: any) {
    const newUsername = prompt('Enter new username:', user.username);
    if (newUsername) {
      user.username = newUsername;
      alert('User updated successfully!');
    }
  }
}