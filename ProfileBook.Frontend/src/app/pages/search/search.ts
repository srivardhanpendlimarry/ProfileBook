import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  searchTerm = '';
  searchResults: any[] = [];
  errorMessage = '';
  isLoading = false;
  searched = false;

  private apiUrl = 'http://localhost:5215/api/User';

  constructor(private http: HttpClient) {}

  searchUsers() {
    if (!this.searchTerm.trim()) {
      this.errorMessage = 'Please enter a username to search!';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.searched = false;

    this.http.get<any[]>(`${this.apiUrl}/search?username=${this.searchTerm}`)
      .subscribe({
        next: (data) => {
          this.searchResults = data;
          this.isLoading = false;
          this.searched = true;
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Search failed. Please try again!';
        }
      });
  }
}