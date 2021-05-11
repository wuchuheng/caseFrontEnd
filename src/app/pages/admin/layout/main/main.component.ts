import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {removeToken} from '../../../../utils/auth'
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isCollapsed = true
  constructor(
    private router: Router,
    private msgService: NzMessageService
  ) { }

  ngOnInit(): void {
  }


  onLogout(): void
  {
    removeToken()
    this.msgService.success('退出成功!')
    setTimeout(() => this.router.navigateByUrl('/admin/login'), 1000)
  }
}
