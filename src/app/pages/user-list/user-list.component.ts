import { User } from '../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subject, tap, Observable, timer, skip } from 'rxjs';

import { UsersService } from '../../users.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  // alert vars
  showAlert: boolean = false;
  AlertTitle: string = '';
  Alert$: Subject<string> = new Subject<string>();
  //rxjs streams
  Users$: Observable<User[]> = this.UsersService.Users$;
  RefreshTime$ = timer(0, 5000).subscribe(this.UsersService.refresh$);
  selectedCategorySubject: Subject<'0' | '1' | '2' | ''> = new Subject<
    '0' | '1' | '2' | ''
  >();
  selectedCategoryAction$ = this.selectedCategorySubject.asObservable();

  //loaded state
  isLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private UsersService: UsersService
  ) {}

  ngOnInit(): void {
    //subscribe to category change and initialize
    const CategoryChange$ = this.selectedCategoryAction$
      .pipe(
        tap((category) => {
          this.isLoaded = false;

          //setting chosen category
          this.UsersService.setUsersCategory(category);
        })
      )
      .subscribe(this.UsersService.refresh$);

    //subscribing to param changes to track selected category
    this.route.queryParams
      .pipe(
        tap((params: HttpParams) => {
          //notify subject if user changed category
          this.selectedCategorySubject.next(params['status']);
        })
      )
      .subscribe();

    //subscribing to user stream
    this.Users$.pipe(
      tap(() => {
        //stop the loader after getting the array
        this.isLoaded = true;

        //init successful cancel timeout alert
        timeout$.unsubscribe();
      })
    ).subscribe();

    //subscribing to alerts
    this.Alert$.subscribe((error: string) => {
      this.showAlert = true;
      this.AlertTitle = error;
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    });

    //setting timeout in case server doesn't respond in 5 seconds
    const timeout$ = timer(5000)
      .pipe(
        tap(() => {
          if (this.isLoaded === false) {
            //trigger alert
            this.Alert$.next('Request timeout, retrying');
          }
        })
      )
      .subscribe();

    //subscribe to open dialog event
    const openDialog = this.dialog.afterOpened
      .pipe(
        tap(() => {
          //cancel the refreshing while dialog is open
          this.RefreshTime$.unsubscribe();
        })
      )
      .subscribe();

    //subscribe to close dialog event
    const closeDialog = this.dialog.afterAllClosed
      .pipe(
        skip(1),
        tap(() => {
          //resuming the refresh timer after dialog is closed
          this.RefreshTime$ = timer(0, 5000).subscribe(
            this.UsersService.refresh$
          );
        })
      )
      .subscribe();
  }
}
