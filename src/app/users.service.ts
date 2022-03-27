import { Injectable } from '@angular/core';
import { Observable, tap, Subject, switchMap, shareReplay, filter } from 'rxjs';
import { User } from './models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly ROOT_URL = 'https://bumagi-frontend-test.herokuapp.com/users';
  refresh$ = new Subject();
  loadUsers$: Observable<User[]>;
  Users$: Observable<User[]> = this.refresh$.pipe(
    switchMap(() => this.loadUsers$),
    shareReplay()
  );
  constructor(private http: HttpClient) {}

  //change get request according to category change
  setUsersCategory(statusCategory: string) {
    if (statusCategory !== 'all') {
      this.loadUsers$ = this.http
        .get<User[]>(`${this.ROOT_URL}?status=${statusCategory}`)
        .pipe(
          filter((users) => Array.isArray(users)),
          tap((users: User[]) => {
            users.sort((userA, userB) => userA.id - userB.id);
          })
        );
    } else {
      this.loadUsers$ = this.http.get<User[]>(`${this.ROOT_URL}?`).pipe(
        filter((users) => Array.isArray(users)),
        tap((users: User[]) => {
          users.sort((userA, userB) => userA.id - userB.id);
        })
      );
    }
  }

  updateUser(id: number, payload: object) {
    return this.http.patch(`${this.ROOT_URL}/${id}`, payload);
  }
}
