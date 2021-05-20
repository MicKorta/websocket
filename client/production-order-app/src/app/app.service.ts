import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

    private _middlewareEndpoint: string;

    constructor() {
        this._middlewareEndpoint =  'http://localhost:8080/api/';
    }

    get middlewareEndpoint(): string {
        return this._middlewareEndpoint;
    }
}