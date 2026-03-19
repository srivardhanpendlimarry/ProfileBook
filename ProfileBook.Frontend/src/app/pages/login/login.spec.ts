import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from '../../app.routes';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter(routes),
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when username is empty', () => {
    component.username = '';
    component.password = '';
    component.onLogin();
    expect(component.errorMessage).toBe('Username is required!');
  });

  it('should show error when password is empty', () => {
    component.username = 'testuser';
    component.password = '';
    component.onLogin();
    expect(component.errorMessage).toBe('Password is required!');
  });

  it('should show error when password is less than 6 characters', () => {
    component.username = 'testuser';
    component.password = '123';
    component.onLogin();
    expect(component.errorMessage).toBe('Password must be at least 6 characters!');
  });

  it('should set isLoading to true when valid credentials entered', () => {
    component.username = 'testuser';
    component.password = '123456';
    component.onLogin();
    expect(component.isLoading).toBeTruthy();
  });

  it('should have empty error message with valid inputs', () => {
    component.username = 'testuser';
    component.password = '123456';
    component.onLogin();
    expect(component.errorMessage).toBe('');
  });
});