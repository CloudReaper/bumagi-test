import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class WebReqInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = this.addAuthHeader(request);

    return next.handle(request);
  }

  addAuthHeader(request: HttpRequest<any>) {
    const token = this.authService.getAuthorizationToken();

    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }
    return request;
  }
}
