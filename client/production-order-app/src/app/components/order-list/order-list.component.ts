import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Order } from '../../models/order.model';
import { OrderListService } from './order-list.service';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { RxStompService} from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

declare var require: any;
const $ = require('jquery');

@Component({
	selector: 'app-order-list',
	templateUrl: './order-list.component.html',
	styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {

  faTrashAlt = faTrashAlt;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	private _topicSubscription: Subscription;
	private _orderList: Order[];
	private _sortedData: Order[];

	displayedColumns: string[] = ['id', 'type', 'state', 'trash'];

	dataSource: any;

	/**
	 *  INITIALISATION
	 */
	constructor(private rxStompService: RxStompService, private _dialog: MatDialog, private _messageService: MessageService, private _orderListService: OrderListService) {
		this._orderList = [];
		this._sortedData = [];
	}

	ngOnInit() {
		this._orderListService.getAllOrders().subscribe(result => {
			if (result.status === 200) {
				for (const o of result.entity) {
					if (o) {
						const order = new Order();
						order.id = o._id;
						order._created = o._created;
						order._state = o._state;
						order._type = o._type;
						this._orderList.push(order);
					}
				}
				this._sortedData = this._orderList.slice();
				this.dataSource = new MatTableDataSource(this._sortedData);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			} else {
				this._messageService.showBottomFullWidthError('The order list could not be retrieved', 5000);
			}
		}, err => {
			console.log(err);
			this._messageService.showBottomFullWidthError('The order list could not be retrieved', 5000);
		});

		this.topicSubscription = this.rxStompService.watch('/topic/public').subscribe((message: Message) => {
			this.handleMessage(message.body);
    	});
	}

	/**
	 * GETTER / SETTER
	 */
	get orderList(): Order[] {
		return this._orderList;
	}

	get sortedData(): Order[] {
		return this._sortedData;
	}

	set topicSubscription(value: Subscription) {
		this._topicSubscription = value;
	}

	get topicSubscription(): Subscription {
		return this._topicSubscription;
	}

	/**
	 * PUBLIC-METHODS
	 */
	public handleMessage(message: string) {
		const o = $.parseJSON(message);
		const order: Order = new Order();
		order.id = o._id;
		order.state = o._state;
		order.created = o._created;
		order.type = o._type;

		if (order.state.toString() === 'PLANNED') {
			this.orderList.unshift(order);
			this._sortedData = this._orderList.slice();
			this.dataSource = new MatTableDataSource(this._sortedData);
			this.dataSource.paginator = this.paginator;
		} else {
			for (const item of this.orderList) {
				if (item && item.id === order.id) {
					item._state = order.state;
				}
			}
		}

		this._sortedData = this._orderList.slice();
	}

	/**
	 * PROTECTED-METHODS
	 */
	protected applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	protected deleteOrder(order: Order) {
		let dialogRef: MatDialogRef<ConfirmDialogComponent>;
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			title: 'Delete production order?',
			message: 'Are you sure you want to delete this production order?',
		};
		dialogRef = this._dialog.open(ConfirmDialogComponent, dialogConfig);
		dialogRef.afterClosed().pipe().subscribe(res => {
			if (res === true) {
				this._orderListService.deleteOrder(order).subscribe(result => {
					if (result.status === 200) {
						this._orderList = [];
						for (const o of result.entity) {
							if (o) {
								const item = new Order();
								item.id = o._id;
								item._created = o._created;
								item._state = o._state;
								item._type = o._type;
								this._orderList.push(item);
							}
						}
						this._sortedData = this._orderList.slice();
						this.dataSource = new MatTableDataSource(this._sortedData);
						this.dataSource.paginator = this.paginator;
						this.dataSource.sort = this.sort;
						this._messageService.showBottomFullWidthInfo('The order has been removed', 5000);
					} else {
						this._messageService.showBottomFullWidthError('The order list could not be retrieved', 5000);
					}
				}, err => {
					console.log(err);
					this._messageService.showBottomFullWidthError('The order list could not be retrieved', 5000);
				});
			}
		});
	}

	protected getColor(order: Order): string {
		return 'red';
	}

	orderListEmpty(): boolean {
		if (!this._orderList || this._orderList.length === 0) {
			return true;
		}
		return false;
	}

	protected sortData(sort: Sort) {
		const data = this._orderList.slice();
		if (!sort.active || sort.direction === '') {
			this._sortedData = data;
			return;
		}

		this._sortedData = data.sort((a, b) => {
			const isAsc = sort.direction === 'asc';
			switch (sort.active) {
				case 'id': return this.compare(a.id, b.id, isAsc);
				case 'state': return this.compare(a.state, b.state, isAsc);
				case 'created': return this.compare(a.created, b.created, isAsc);
				default: return 0;
			}
		});
	}

	/**
	 * PRIVATE-METHODS
	 */
	private compare(a: number | string, b: number | string, isAsc: boolean) {
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}
}
