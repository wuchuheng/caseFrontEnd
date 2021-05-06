import { Component, OnInit } from '@angular/core';

type NavsType = {title: string}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navs: NavsType[] = [
    {title: '社交'},
    {title: '商城'},
    {title: '直播'},
    {title: '社交'},
    {title: '商城'},
    {title: '直播'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
