import { Injectable, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { User, UserType } from '../models/user.models';
const USER_KEY = 'user-info';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  localStorage: Storage | undefined;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
  }

  clean(): void {
    this.localStorage!.clear();
  }

  public saveUser(user: User): void {
    this.localStorage!.removeItem(USER_KEY);
    this.localStorage!.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User {
    const user = this.localStorage!.getItem(USER_KEY);
    const returnUser = JSON.parse(user!) ?? {};

    return returnUser;
  }

  public loggedIn(): boolean {
    if (this.localStorage === undefined) return false;
    const user = this.localStorage.getItem(USER_KEY);

    return user ? true : false;
  }
}
