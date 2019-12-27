import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './../../services/user.service';
import { LoggedInUser } from './../../models/loggedInUser';
import { Component, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: LoggedInUser;

  constructor(private userService: UserService,
    private router: Router, private breakpointObserver: BreakpointObserver) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.isLoggedIn()) {
          this.user = this.userService.getLoggedInUser();
        }
      }
    });
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  isClinicalCentreAdmin() {
    return this.userService.isClinicalCentreAdmin();
  }

  isClinicAdmin() {
    return this.userService.isClinicAdmin();
  }

  isPatient() {
    return this.userService.isPatient();
  }

  isDoctor() {
    return this.userService.isDoctor();
  }

  isNurse() {
    return this.userService.isNurse();
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/user/login']);
  }
}
