import { LoggedInUser } from './../models/loggedInUser';
import { UserTokenState } from './../models/userTokenState';
import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    loggedInUser: LoggedInUser;
    userTokenState: UserTokenState;
    constructor(public userService: UserService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loggedInUser = JSON.parse(localStorage.getItem("LoggedInUser"));

        if (this.loggedInUser) {
            this.userTokenState = this.loggedInUser.userTokenState;
            if (this.userTokenState) {
                if (this.userTokenState.accessToken) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${this.userTokenState.accessToken}`
                        }
                    });
                }
            }
        }

        return next.handle(request);
    }
}