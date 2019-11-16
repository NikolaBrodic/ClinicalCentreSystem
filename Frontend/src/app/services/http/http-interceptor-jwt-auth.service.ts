import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { JwtAuthService } from '../jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorJwtAuthService implements HttpInterceptor {

  constructor(
    private jwtAuthService: JwtAuthService
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler) {
    let jwtAuthHeaderString = this.jwtAuthService.getAuthenticatedToken();
    let email = this.jwtAuthService.getAuthenticatedPatient();

    // if (jwtAuthHeaderString && email) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: 'b058d0e4-3ea2-4e7b-8f10-cbd5d47eedf3'
    //     }
    //   });
    // }

    request = request.clone({
      setHeaders: {
        Authorization: 'b058d0e4-3ea2-4e7b-8f10-cbd5d47eedf3'
      }
    });

    return next.handle(request);
  }

}
