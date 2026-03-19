import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { PostFeed } from './pages/post-feed/post-feed';
import { Messaging } from './pages/messaging/messaging';
import { Admin } from './pages/admin/admin';
import { Search } from './pages/search/search';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'feed', component: PostFeed, canActivate: [authGuard] },
  { path: 'messages', component: Messaging, canActivate: [authGuard] },
  { path: 'admin', component: Admin, canActivate: [authGuard] },
  { path: 'search', component: Search, canActivate: [authGuard] },
];