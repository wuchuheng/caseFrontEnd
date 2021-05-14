import { Component, OnInit } from '@angular/core';
import {CasesService} from '../../services/graphql/cases/cases.service';
import {ActivatedRoute, Router} from '@angular/router';
import copy from 'copy-to-clipboard';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ScreenBreakPointService} from '../../services/screenBreakPoint/screen-break-point.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  case!: GrapqlType.OneCaseResType
  loading = false

  device

  constructor(
    private caseService: CasesService,
    private route: ActivatedRoute,
    private msgService: NzMessageService,
    private screenBreakPointService: ScreenBreakPointService,
    private router: Router
  ) {
    this.device = screenBreakPointService.device
  }

  ngOnInit(): void
  {
      this.screenBreakPointService.deviceSubject.subscribe(device => this.device = device )
      const id = Number(this.route.snapshot.paramMap.get('id'))
      this._fetchCaseById(id)
  }

  private _fetchCaseById(id: number): void
  {
    this.loading = true
    this.caseService.getCaseById(id).subscribe(res => {
      this.loading = false
      this.case = res.case
    }, error => {
      console.log(error)
    })
  }

  onCopy(): void
  {
    copy(this.case.file.url) ? this.msgService.success( '复制成功') : this.msgService.error('复制失败')
  }

  onDownload(): void
  {
    window.open(this.case.file.url)
  }
  onRedirectRootPath(): void
  {
    this.router.navigateByUrl('/')
  }
}

