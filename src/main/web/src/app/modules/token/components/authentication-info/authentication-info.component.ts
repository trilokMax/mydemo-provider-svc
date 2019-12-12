import { Component, OnInit, Input } from '@angular/core';
import { Token } from 'src/app/shared/models/token';

@Component({
	selector: 'app-authentication-info',
	templateUrl: './authentication-info.component.html',
	styleUrls: ['./authentication-info.component.scss']
})
export class AuthenticationInfoComponent implements OnInit {

	@Input() token: Token;
	isDefined: boolean;

	constructor() { }

	ngOnInit() {
		this.isDefined = this.token && typeof this.token.payload.decoded.authType !== 'undefined';
	}

}
