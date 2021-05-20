import { Injectable } from '@angular/core';
import { AppService } from '../../app.service';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderInputService {

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

	createSwitch(): Observable<any> {
    const url = this._middlewareEndpoint + 'createSwitcher';
    return this._http.get(url, this._httpOptions)
      .pipe(map(
        result => {
          return result;
      }));
	}

	createLamp(): Observable<any> {
    const url = this._middlewareEndpoint + 'createLight';
    return this._http.get(url, this._httpOptions)
      .pipe(map(
        result => {
          return result;
      }));
	}

	createCase(): Observable<any> {
    const url = this._middlewareEndpoint + 'createHousing';
    return this._http.get(url, this._httpOptions)
      .pipe(map(
        result => {
          return result;
      }));
  }
}
