import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;

  constructor(private router: Router, private fireAuthRef: AngularFireAuth) {
    this.fireAuthRef.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['home']);
      } else {
        localStorage.setItem('user', null);
        this.router.navigate(['login']);
      }
    });
  }

  getUserInfo():any{
    const userInfo = JSON.parse(localStorage.getItem('user'));
    return userInfo;
  }
  getToken():string{
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if(userInfo) {
      return userInfo.stsTokenManager.accessToken;
    }
    return '';
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("user");
    console.log(user);
    console.log("user");
    return user !== null;
  }

  async login(email: string, password: string) {
    return await this.fireAuthRef.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    return await this.fireAuthRef.signOut();
  }
}
