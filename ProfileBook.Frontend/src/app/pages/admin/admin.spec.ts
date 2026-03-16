import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Admin } from './admin';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('Admin Component', () => {
  let component: Admin;
  let fixture: ComponentFixture<Admin>;

  beforeEach(async () => {
    localStorage.setItem('role', 'Admin');
    localStorage.setItem('token', 'admin-token-123');

    await TestBed.configureTestingModule({
      imports: [Admin],
      providers: [provideRouter(routes)]
    }).compileComponents();

    fixture = TestBed.createComponent(Admin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create admin component', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 users initially', () => {
    expect(component.users.length).toBe(3);
  });

  it('should delete a user', () => {
    component.deleteUser(1);
    expect(component.users.length).toBe(2);
  });

  it('should not find deleted user', () => {
    component.deleteUser(1);
    const user = component.users.find(u => u.id === 1);
    expect(user).toBeUndefined();
  });

  it('should have bob_wilson with Reported status', () => {
    const bob = component.users.find(u => u.username === 'bob_wilson');
    expect(bob?.status).toBe('Reported');
  });
});