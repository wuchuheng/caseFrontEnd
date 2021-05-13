import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {removeToken} from '../../../../utils/auth'
import {Location} from '@angular/common';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzIconService} from 'ng-zorro-antd/icon';
import {environment} from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isCollapsed = true
  constructor(
    private router: Router,
    private msgService: NzMessageService,
    private iconService: NzIconService,
    private location: Location,
  ) {
    this.iconService.fetchFromIconfont({
      scriptUrl: environment.iconFontJsUrl
    })
  }

  currentPath = '/admin/home'

  ngOnInit(): void {
    this.currentPath = this.location.path()
    this.router.events.subscribe(val => {
      this.currentPath = this.location.path() !== '' ? this.location.path() : '/admin/home'
    })
  }

  onLogout(): void
  {
    removeToken()
    this.msgService.success('退出成功!')
    setTimeout(() => this.router.navigateByUrl('/admin/login'), 1000)
  }

  onRedirect(path: string): void
  {
    this.router.navigateByUrl(path)
  }
}
