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
  url = 'http://localhost:8000';
  currentUserSignal = signal<User | undefined | null>(undefined);
  platformId = inject(PLATFORM_ID);

  constructor(private httpClient: HttpClient) {
    this.httpClient = inject(HttpClient);
  }

  registerUser(user: User): Observable<string> {
    return this.httpClient.post(`${this.url}/auth/register`, user, {
      responseType: 'text',
    });
  }

  logout(): Observable<Object> {
    return this.httpClient.post(`${this.url}/auth/logout`, {}, httpOptions);
  }
}
