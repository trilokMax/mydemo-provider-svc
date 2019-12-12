import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Token } from '../models/token';

@Injectable({
	providedIn: 'root'
})
export class TokenService {

	private _data: BehaviorSubject<Token> = new BehaviorSubject(null);

	public data: Observable<Token> = this._data.asObservable();

	constructor(private http: HttpClient) { }

	get(): Observable<any> {
		return this.http.get('/provider/token');
	}

	setData(tokenData: any, encoded?: boolean) {
		const token = new Token(tokenData, encoded);
		this._data.next(token);
		return token;
	}

}
