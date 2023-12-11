import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.models';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://mcevent-backend.onrender.com';
  currentUserSignal = signal<User | undefined | null>(undefined);
  platformId = inject(PLATFORM_ID);

  constructor(private httpClient: HttpClient) {
    this.httpClient = inject(HttpClient);
  }

  logout(): Observable<Object> {
    return this.httpClient.post(`${this.url}/auth/logout`, {}, httpOptions);
  }
}
