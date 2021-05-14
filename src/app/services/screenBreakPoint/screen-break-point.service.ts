/**
 *  屏幕大小监听服务
 */
import { Injectable } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Observer, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenBreakPointService {
  device: ServiceType.DeviceType
  deviceSubject = new Subject<ServiceType.DeviceType>()

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
    const maxWidth = 640
    this.device = window.innerWidth <= maxWidth ? 'sm' : 'md'
    this.breakpointObserver.observe([
      `(max-width: ${maxWidth}px)`
    ]).subscribe(result => {
      if (result.matches) {
        this.deviceSubject.next('sm')
      } else {
        this.deviceSubject.next('md')
      }
    })
  }
}
