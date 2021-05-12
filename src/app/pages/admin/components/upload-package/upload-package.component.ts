import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpEventType} from '@angular/common/http';
import {UploadService} from '../../../../services/upload/upload.service';

@Component({
  selector: 'app-upload-package',
  templateUrl: './upload-package.component.html',
  styleUrls: ['./upload-package.component.scss']
})
export class UploadPackageComponent implements OnInit {
  @ViewChild('file', {static: false}) input!: ElementRef<HTMLInputElement>;
  @Output() uploaded: EventEmitter<ApiType.UploadApkResType> = new EventEmitter<ApiType.UploadApkResType>()
  uploadReport = {
    isUpload: false,
    progress: 0
  }
  packageInfo!: ApiType.UploadApkResType

  constructor(
    private uploadService: UploadService
  ) { }

  ngOnInit(): void
  {
    setTimeout(() => this.onSelectFile() , 500)
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
          break;
        // 上传成功
        case HttpEventType.Response:
          this.uploadReport = {
            isUpload: false,
            progress: 0
          }
          this.packageInfo = event.body as ApiType.UploadApkResType
          this.uploaded.emit(this.packageInfo)
          break;
      }
    })
  }
}
