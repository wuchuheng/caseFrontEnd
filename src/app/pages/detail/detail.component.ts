import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public desc = '一款专业情绪测评的软件，软件分双端用户端以及管理师分析端，用户可以将自己的情绪和想法通过图案画出来后拍照上传到平台，管理师收到任务订单后会对用户所提供的图案进行分析当前的一个状况，运势、家庭、工作、学习等分析。具备商城功能可推荐用户建议用户购买某些物品来提升自身的运势。'

  constructor() { }

  ngOnInit(): void {
  }

}
