import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import {Observable, Observer} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd/message';
import {environment} from '../../../../../../../../environments/environment.prod';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@Component({
  selector: 'app-multi-upload',
  templateUrl: './multi-upload.component.html',
  styleUrls: ['./multi-upload.component.scss']
})
export class MultiUploadComponent implements OnInit {
  @Output() nzChange: EventEmitter<NzUploadFile[]> = new EventEmitter<NzUploadFile[]>()
  @Input() initFileList!: NzUploadFile[]
  actionUrl = `${environment.apiUrl}/uploadIcons`
  previewImage: string | undefined = '';
  previewVisible = false;

  constructor(private msg: NzMessageService) {}

  ngOnInit(): void {
  }

  get fileList(): NzUploadFile[] {
    return this.initFileList
  }

  set fileList(newList: NzUploadFile[])
  {
  }

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  onBeforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };


  handleChange(info: { file: NzUploadFile, fileList: NzUploadFile[] }): void {
    switch (info.file.status) {
      case 'uploading':
        break;
      case 'done':
        this.nzChange.emit(info.fileList)
        break;
      case 'error':
        this.msg.error('Network error');
        break;
    }
  }
}
