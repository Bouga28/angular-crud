import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const USER_TOKEN = 'auth-token'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any, authorisation:any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.sessionStorage.setItem(USER_TOKEN, JSON.stringify(authorisation));
  }

  public getToken(): any {
    const token = window.sessionStorage.getItem(USER_TOKEN);
    if (token) {
      return JSON.parse(token);
    }

    return {};
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }



  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
