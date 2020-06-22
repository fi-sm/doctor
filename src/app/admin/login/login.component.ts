import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";
  anyErrorOccured = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingBarService
  ) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn) {
      this.router.navigate(["home"]);
    }
  }

  doLogin(username, password) {
    this.loadingService.start();
    this.authService.login(username, password)
    .then((user) => {
      this.router.navigate(["home"]);
    })
    .catch(() => this.anyErrorOccured = true)
    .finally(() => this.loadingService.stop());
  }
}
