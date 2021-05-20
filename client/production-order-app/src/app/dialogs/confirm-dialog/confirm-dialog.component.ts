import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

	_message: string;
	_title: string;

	ngOnInit() {
        // NOOP
	}

    constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
		this._message = data.message;
		this._title = data.title;
    }

    close(ret: boolean) {
        this.dialogRef.close(ret);
    }
}
