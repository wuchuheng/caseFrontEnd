import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item-render',
  templateUrl: './item-render.component.html',
  styleUrls: ['./item-render.component.scss']
})
export class ItemRenderComponent implements OnInit {
  public id = 1
  public desc = '一款潮流人士专用的软件，具备商城，短视频，社区，租赁等功能，一款深受潮人喜爱的软件，专门发布一些关于潮流穿搭的资讯，给潮人推荐一些潮流的衣服、包包、潮鞋、享受零元租，和限时秒杀等活动。 '
  public title = '领潮APP'

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleShowDetail(): void
  {
    const url = `/cases/${this.id}`
    this.router.navigateByUrl(url)
  }

}
