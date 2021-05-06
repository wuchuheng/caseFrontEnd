import { Component, OnInit } from '@angular/core';

type ModelType = {
  username: string
  password: string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  powers: string[] = [ 'Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer' ]

  model: ModelType = { username: '', password: '' }

  submitted = false

  constructor() { }


  ngOnInit(): void { }

  onSubmit(): void
  {
    console.log(this.model)
    this.submitted = true
  }

  get diagnostic(): string
  {
    return JSON.stringify(this.model)
  }
}
