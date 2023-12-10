import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/user.models';
import { Observable } from 'rxjs';
import { httpOptions } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  isInitialized = false;

  URL = 'http://localhost:8000';

  constructor(private http: HttpClient) {
    console.count('UserService:constructor');
  }

  initialize() {
    if (!this.isInitialized) {
      console.count('UserService:initialize');
      this.isInitialized = true;
    }
  }

  updateUserPins(user: User): Observable<Object> {
    const request = { email: user.email, pins: user.pins };
    return this.http.put(`${this.URL}/users`, request, httpOptions);
  }

  deleteUserById(id: string): Observable<User> {
    return this.http.delete<User>(`${this.URL}/users/${id}`, httpOptions);
  }

  updateUserById(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.URL}/users/${id}`, user, httpOptions);
  }
}
