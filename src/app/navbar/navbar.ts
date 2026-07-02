import { Component, OnInit } from '@angular/core';
import { RouterLink, NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  isLoggedIn = false;

  constructor(
    private cookie: CookieService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.checkAuth();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkAuth();
      }
    });
  }

  checkAuth() {
    this.isLoggedIn = !!this.cookie.get('user');
  }


  // __________________________________________________________________


  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

 

}
