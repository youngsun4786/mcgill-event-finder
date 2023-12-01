import { Injectable } from '@angular/core';
import { User } from '../models/user.models';
const USER_KEY = 'user-info';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  clean(): void {
    localStorage.clear();
  }

  public saveUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User {
    const user = localStorage.getItem(USER_KEY);
    const returnUser = (JSON.parse(user!) ?? {}) as User;
    return returnUser;
  }

  public loggedIn(): boolean {
    const user = localStorage.getItem(USER_KEY);
    return user ? true : false;
  }
}
