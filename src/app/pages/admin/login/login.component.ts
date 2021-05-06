import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
   console.log(this.form.valid)
    // this.form.setValue(this.form.value)
  }
}
