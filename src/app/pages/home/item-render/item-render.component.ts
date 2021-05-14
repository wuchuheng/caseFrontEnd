import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ScreenBreakPointService} from '../../../services/screenBreakPoint/screen-break-point.service';

@Component({
  selector: 'app-item-render',
  templateUrl: './item-render.component.html',
  styleUrls: ['./item-render.component.scss']
})
export class ItemRenderComponent implements OnInit {
  @Input() id!: number
  @Input() desc!: string
  @Input() title!: string
  @Input() fileUrl!: string
  @Input() banner!: {id: number; url: string}[]
  @Input() cover!: {id: number; url: string}
  @Input() icon!: {id: number; url: string}

  device!: ServiceType.DeviceType

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private screenBreakPointService: ScreenBreakPointService
  ) { }

  ngOnInit(): void {
    this.device = this.screenBreakPointService.device
    this.screenBreakPointService.deviceSubject.subscribe(device => this.device = device)
  }

  handleShowDetail(): void
  {
    const url = `/cases/${this.id}`
    this.router.navigateByUrl(url)
  }
  onDownload(): void
  {
    window.open(this.fileUrl)
  }
}
