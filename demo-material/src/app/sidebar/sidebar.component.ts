import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {
  role: number = 3;
  isLoggedIn = false;
  showAdminBoard = false;
  showRHBoard = false;
  showUserBoard = false;
  showLogin = true;
  username?: string;

  needsLogin: boolean | undefined;
  _userName: string = '';

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router:Router

  ) {}


  get userName(): string {
    return this._userName;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();

      console.log("user : ", user);
      this.role = user.role_id;
      console.log("role : ", this.role);

      this.showAdminBoard = this.role==1;
      this.showRHBoard = this.role==2;
      this.showUserBoard = this.role==3;

      this.showLogin = false;
      this.router.navigate(["home"])

    }
    else
      this.showLogin = true;

    
  }

  login(): void {
    this._userName = 'Max';
  }


  logout(): void {
    console.log("Logout Clicked");
    this.authService.logout().subscribe({
      next: res => {
        console.log("LOGGED OUT ", res);
       // this.storageService.clean();
       this.storageService.clean();
        window.location.reload();
        
        this.ngOnInit();
        
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
