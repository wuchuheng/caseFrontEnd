import { Component, OnInit } from '@angular/core';
import {ScreenBreakPointService} from '../../services/screenBreakPoint/screen-break-point.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  device

  constructor(
    private screenBreakPointService: ScreenBreakPointService
  ) {
    this.device = screenBreakPointService.device
  }

  ngOnInit(): void {
    this.screenBreakPointService.deviceSubject.subscribe(device => this.device = device)
  }
}
