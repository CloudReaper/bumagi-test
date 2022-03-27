
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly ROOT_URL = 'https://bumagi-frontend-test.herokuapp.com'
  AUTH_ROOT: string = 'auth';
  constructor(private http: HttpClient, private router: Router) {}

  private setSession(AuthorizationToken: string) {
    localStorage.setItem('Authorization', AuthorizationToken);
  }

  login(login: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/${this.AUTH_ROOT}`, { login,password }).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        console.log(res)
        this.setSession(res.headers.get('Authorization'));
      })
    );
  }

  getAuthorizationToken() {
    return localStorage.getItem('Authorization')
  }
}
