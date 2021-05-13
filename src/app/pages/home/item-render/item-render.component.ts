import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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
  onDownload(): void
  {
    window.open(this.fileUrl)
  }
}
