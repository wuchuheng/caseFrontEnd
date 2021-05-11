import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

type NavsType = {title: string, path: string}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navs: NavsType[] = [
    {title: '首页', path: '/'},
    {title: '社交', path: '/'},
    {title: '商城', path: '/'},
    {title: '直播', path: '/'},
    {title: '社交', path: '/'},
    {title: '商城', path: '/'},
    {title: '直播', path: '/'}
  ]
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onRedirect(url: string): void
  {
      this.router.navigateByUrl(url)
  }
}
