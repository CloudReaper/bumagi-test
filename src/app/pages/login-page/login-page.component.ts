import { AuthService } from '../../auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  hidePassword: boolean = true;
  loginControlGroup: FormGroup
  constructor(private AuthService: AuthService, private router: Router,private fb:FormBuilder) {}

  ngOnInit(): void {
    this.loginControlGroup = this.fb.group({
      login: new FormControl('',[
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('',[
        Validators.required
      ])
    })
  }


  getLogin() {
    return this.loginControlGroup.get('login').value
  }
  getPassword() {
    return this.loginControlGroup.get('password').value
  }

  onHidePasswordClicked() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    this.AuthService.login(this.getLogin(), this.getPassword()).subscribe(
      (res: HttpResponse<any>) => {if(res.status === 200) this.router.navigateByUrl('/users?status=all') }
    );
  }

  
}
