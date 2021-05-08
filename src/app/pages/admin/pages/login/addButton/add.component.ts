import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UploadService} from '../../../../../services/upload/upload.service';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @ViewChild('file', {static: false}) input!: ElementRef<HTMLInputElement>;

  uploadReport = {
    isUpload: false,
    progress: 0
  }
  isVisitedForm = true

  constructor(
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {}

  /**
   * 选择上传文件
   */
  onSelectFile(): void
  {
    this.input.nativeElement.value = ''
    this.input.nativeElement.click()
  }

  /**
   * 文件上传处理
   */
  onSelectedFile(): void
  {
    // @ts-ignore
    const file = this.input.nativeElement.files[0] as File
    this.uploadService.singleUpload(file).subscribe(event => {
      switch (event.type) {
        case HttpEventType.Sent:
          this.uploadReport = {
            isUpload: true,
            progress: 0
          }
          break;
        case HttpEventType.UploadProgress:
          const total = event.total || 0
          this.uploadReport.progress = Math.round(100 * (event.loaded / total));
          break;
        // 上传成功
        case HttpEventType.Response:
          this.uploadReport = {
            isUpload: false,
            progress: 0
          }
          console.log(event.body)
          break;
      }
    })
  }
}
