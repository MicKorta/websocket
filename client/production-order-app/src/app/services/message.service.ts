import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class MessageService {

  constructor(private toastr: ToastrService) { /* NOOP */}

  showSuccessMessage(message: string, detail: string, timeOut: number) {
    this.toastr.success(message, detail, {positionClass: 'toast-top-right', timeOut: timeOut});
  }

  showInfoMessage(message: string, detail: string, timeOut: number) {
    this.toastr.info(message, detail, {positionClass: 'toast-top-right', timeOut: timeOut});
  }

  showErrorMessage(message: string, detail: string, timeOut: number) {
    this.toastr.error(message, detail, {positionClass: 'toast-top-right', timeOut: timeOut});
  }

  showBottomFullWidthInfo(message: string, timeOut: number) {
    this.toastr.info(message, '', {positionClass: 'toast-bottom-full-width', timeOut: timeOut});
  }

  showBottomFullWidthError(message: string, timeOut: number) {
    this.toastr.error(message, '', {positionClass: 'toast-bottom-full-width', timeOut: timeOut});
  }
}
