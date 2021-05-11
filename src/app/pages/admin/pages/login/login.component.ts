import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GraphqlService } from 'src/app/services/graphql/graphql.service';
import { LoginService } from 'src/app/services/graphql/login/login.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';

type AccountModelType = {
  username: string
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ])
  })
  constructor(
    private loginService: LoginService,
    public graphql: GraphqlService,
    private message: NzMessageService,
    private router: Router
  ) {
   }
  ngOnInit(): void {}

  get username(): AbstractControl
  {
    return this.form.get('username') as AbstractControl
  }

  get password(): AbstractControl
  {
    return this.form.get('password') as AbstractControl
  }

  onSubmit(): void
  {
    this.loginService
      .login(this.form.value)
      .subscribe(res => {
        this.message.create('success', '登录成功')
        setTimeout(() => {
          this.router.navigateByUrl('/admin/home')
        }, 1000)
      }, err => {
        console.log(err)
      })
  }
}
