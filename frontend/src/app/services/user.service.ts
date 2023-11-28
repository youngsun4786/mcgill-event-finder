import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { User } from '../models/user.models';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:8000';
  private users$: Subject<User[]> = new Subject();

  constructor(private httpClient: HttpClient) {
    this.httpClient = inject(HttpClient);
  }

  private refreshUser() {
    this.httpClient.get<User[]>(`${this.url}/users`).subscribe((users) => {
      this.users$.next(users);
    });
  }

  registerUser(user: User): Observable<string> {
    return this.httpClient.post(`${this.url}/auth/register`, user, {
      responseType: 'text',
    });
  }
}
