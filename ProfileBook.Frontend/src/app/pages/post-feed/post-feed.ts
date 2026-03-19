import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-feed',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.css'
})
export class PostFeed implements OnInit {
  posts: any[] = [];
  newPostContent = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  commentInputs: { [key: number]: string } = {};
  showComments: { [key: number]: boolean } = {};
  postComments: { [key: number]: any[] } = {};

  private apiUrl = 'http://localhost:5215/api/Post';
  private commentUrl = 'http://localhost:5215/api/Comment';
  private reportUrl = 'http://localhost:5215/api/Report';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.posts = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error loading posts:', err);
        this.posts = [];
      }
    });
  }

  submitPost() {
    if (!this.newPostContent.trim()) {
      this.errorMessage = 'Post content cannot be empty!';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const userId = localStorage.getItem('userId') || '1';

    this.http.post<any>(
      `${this.apiUrl}?userId=${userId}`,
      { content: this.newPostContent }
    ).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = '✅ Post submitted for approval!';
        this.newPostContent = '';
        alert('Post submitted! Admin will review and approve it.');
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = '❌ Failed to submit post!';
      }
    });
  }

  likePost(postId: number, index: number) {
    this.http.put<any>(`${this.apiUrl}/like/${postId}`, {})
      .subscribe({
        next: (response) => {
          this.posts[index].likes = response.likes;
          this.cdr.detectChanges();
        },
        error: (err) => console.log('Error liking post')
      });
  }

  toggleComments(postId: number) {
    this.showComments[postId] = !this.showComments[postId];
    if (this.showComments[postId]) {
      this.loadComments(postId);
    }
  }

  loadComments(postId: number) {
    this.http.get<any[]>(`${this.commentUrl}/post/${postId}`)
      .subscribe({
        next: (data) => {
          this.postComments[postId] = data;
          this.cdr.detectChanges();
        },
        error: (err) => console.log('Error loading comments')
      });
  }

  submitComment(postId: number) {
    const content = this.commentInputs[postId];
    if (!content || !content.trim()) {
      alert('Please enter a comment!');
      return;
    }

    const userId = localStorage.getItem('userId') || '1';

    this.http.post<any>(
      `${this.commentUrl}?userId=${userId}`,
      { postId: postId, content: content }
    ).subscribe({
      next: (response) => {
        this.commentInputs[postId] = '';
        this.loadComments(postId);
        alert('Comment added!');
      },
      error: (err) => alert('Failed to add comment!')
    });
  }

  reportUser(reportedUserId: number) {
    const reason = prompt('Enter reason for reporting this user:');
    if (!reason || !reason.trim()) return;

    const reportingUserId = localStorage.getItem('userId') || '1';

    this.http.post<any>(this.reportUrl, {
      reportedUserId: reportedUserId,
      reportingUserId: parseInt(reportingUserId),
      reason: reason
    }).subscribe({
      next: () => alert('User reported successfully! Admin will review.'),
      error: (err) => alert('Failed to report user!')
    });
  }
}