import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { WebReqInterceptor } from './web-req.interceptor';
import { AppComponent } from './app.component';

//components
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserListItemComponent } from './pages/user-list/user-list-item/user-list-item.component';
import { NotificationComponent } from './components/notification/notification.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';

//material dialog
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UserListComponent,
    UserListItemComponent,
    NotificationComponent,
    EditUserComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,useClass:WebReqInterceptor,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
