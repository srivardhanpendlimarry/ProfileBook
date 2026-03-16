import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Register } from './register';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('Register Component', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [provideRouter(routes)]
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create register component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when username is empty', () => {
    component.username = '';
    component.onRegister();
    expect(component.errorMessage).toBe('Username is required!');
  });

  it('should show error when username is less than 3 characters', () => {
    component.username = 'ab';
    component.onRegister();
    expect(component.errorMessage).toBe('Username must be at least 3 characters!');
  });

  it('should show error when email is invalid', () => {
    component.username = 'testuser';
    component.email = 'invalidemail';
    component.onRegister();
    expect(component.errorMessage).toBe('Please enter a valid email!');
  });

  it('should show error when passwords do not match', () => {
    component.username = 'testuser';
    component.email = 'test@example.com';
    component.password = '123456';
    component.confirmPassword = '654321';
    component.onRegister();
    expect(component.errorMessage).toBe('Passwords do not match!');
  });

  it('should show success message with valid data', () => {
    component.username = 'testuser';
    component.email = 'test@example.com';
    component.password = '123456';
    component.confirmPassword = '123456';
    component.onRegister();
    expect(component.successMessage).toBe('Registration successful! Redirecting to login...');
  });
});