import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {UploadService} from '../../../../../services/upload/upload.service';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @ViewChild('file', {static: false}) input!: ElementRef<HTMLInputElement>;
  @Output() created: EventEmitter<GrapqlType.CreateCaseResType> = new EventEmitter<GrapqlType.CreateCaseResType>()
  packageInfo!: ApiType.UploadApkResType

  msg!: string

  uploadReport = {
    isUpload: false,
    progress: 0
  }
  isVisitedForm = false

  constructor(
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.resetPackageInfo()
  }

  resetPackageInfo(): void
  {
    this. packageInfo = {
      iconFileId: 0,
      iconUrl: '',
      id: 0,
      label: '',
      size: 0,
      type: 'android',
      version: ''
    }
  }

  /**
   * 选择上传文件
   */
  onSelectFile(): void
  {
    this.msg = '上传中...'
    this.resetPackageInfo()
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
          if (this.uploadReport.progress === 100) {
            this.msg = '解析中...'
          }
          break;
        // 上传成功
        case HttpEventType.Response:
          this.uploadReport = {
            isUpload: false,
            progress: 0
          }
          this.isVisitedForm = true
          this.packageInfo = event.body as ApiType.UploadApkResType
          break;
      }
    })
  }
  onCreated(params: GrapqlType.CreateCaseResType): void
  {
    this.isVisitedForm = false
    this.created.emit(params)
  }

  onCancel(): void
  {
    this.resetPackageInfo()
    this.isVisitedForm = false
  }
}
