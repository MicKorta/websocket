import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { OrderInputService } from './order-input.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

enum ViewStatus {
	PENDING,
	PROGRESS
}

@Component({
	selector: 'app-order-input',
	templateUrl: './order-input.component.html',
	styleUrls: ['./order-input.component.css'],
})
export class OrderInputComponent {

  faSpinner = faSpinner;
	ViewStatus = ViewStatus;
	_viewStatus: ViewStatus;

	/**
	 * INITIALISATION
	 */
	constructor(private _messageService: MessageService, private _orderInputService: OrderInputService) {
		this._viewStatus = ViewStatus.PENDING;
	}

	/**
	 * GETTER / SETTER
	 */
	get viewStatus(): ViewStatus {
		return this._viewStatus;
	}

	/**
	 * PROTECTED-METHODS
	 */
	protected createSwitch() {
		this._viewStatus = ViewStatus.PROGRESS;
		this._orderInputService.createSwitch().subscribe(result => {
			if (result.status === 200) {
				this._viewStatus = ViewStatus.PENDING;
				this._messageService.showBottomFullWidthInfo('Your order has been placed: SWITCH', 5000);
			} else {
				this._viewStatus = ViewStatus.PENDING;
				this._messageService.showBottomFullWidthError('Your order could not be placed', 5000);
			}
		}, err => {
			console.log(err);
			this._viewStatus = ViewStatus.PENDING;
			this._messageService.showBottomFullWidthError('Your order could not be placed', 5000);
		});
	}

	protected createLamp() {
		this._viewStatus = ViewStatus.PROGRESS;
		this._orderInputService.createLamp().subscribe(result => {
			if (result.status === 200) {
				this._viewStatus = ViewStatus.PENDING;
				this._messageService.showBottomFullWidthInfo('Your order has been placed: LAMP', 5000);
			} else {
				this._viewStatus = ViewStatus.PENDING;
				this._messageService.showBottomFullWidthError('Your order could not be placed', 5000);
			}
		}, err => {
			this._viewStatus = ViewStatus.PENDING;
			this._messageService.showBottomFullWidthError('Your order could not be placed', 5000);
		});
	}

	protected createCase() {
		this._viewStatus = ViewStatus.PROGRESS;
		this._orderInputService.createCase().subscribe(result => {
			if (result.status === 200) {
				this._viewStatus = ViewStatus.PENDING;
				this._messageService.showBottomFullWidthInfo('Your order has been placed: CASE', 5000);
			} else {
				this._viewStatus = ViewStatus.PENDING;
				this._messageService.showBottomFullWidthError('Your order could not be placed', 5000);
			}
		}, err => {
			this._viewStatus = ViewStatus.PENDING;
			this._messageService.showBottomFullWidthError('Your order could not be placed', 5000);
		});
	}
}
