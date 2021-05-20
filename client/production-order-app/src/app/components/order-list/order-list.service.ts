import { Injectable } from '@angular/core';
import { AppService } from '../../app.service';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from './../../models/order.model';

@Injectable()
export class OrderListService {

	private _middlewareEndpoint: string;

	constructor(private _appService: AppService, private _http: HttpClient) {
		this._middlewareEndpoint = this._appService.middlewareEndpoint;
	}

	private _httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Cache-Control': 'no-cache',
			'Pragma': 'no-cache',
			'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
			'Access-Control-Allow-Origin': '*'
		})
	};

	getAllOrders(): Observable<any> {
    const url = this._middlewareEndpoint + 'getAllOrders';
    return this._http.get(url, this._httpOptions)
      .pipe(map(
        result => {
          return result;
      }));
	}

	deleteOrder(order: Order): Observable<any> {
		const url = this._middlewareEndpoint + 'deleteOrder';
		return this._http.put(url, JSON.stringify(order), this._httpOptions)
			.pipe(map(
				result => {
					return result;
				}));
	}
}
