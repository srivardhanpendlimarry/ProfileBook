import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save token to localStorage', () => {
    service.saveToken('test-token');
    expect(localStorage.getItem('token')).toBe('test-token');
  });

  it('should return token from localStorage', () => {
    localStorage.setItem('token', 'test-token');
    expect(service.getToken()).toBe('test-token');
  });

  it('should return true when logged in', () => {
    localStorage.setItem('token', 'test-token');
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('should return false when not logged in', () => {
    localStorage.removeItem('token');
    expect(service.isLoggedIn()).toBeFalsy();
  });

  it('should clear token on logout', () => {
    localStorage.setItem('token', 'test-token');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
});