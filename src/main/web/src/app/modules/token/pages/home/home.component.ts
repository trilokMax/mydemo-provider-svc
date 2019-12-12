import { Component, OnInit, OnDestroy  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TokenService } from 'src/app/shared/services/token.service';
import { Token } from 'src/app/shared/models/token';
import { Subscription } from 'rxjs';

const datePipe = new DatePipe('en-US');
const dateFormatter = function() {
	return datePipe.transform((this * 1000), 'MM/dd/yyyy HH:mm:ss');
};

@Component({
	selector: 'app-token-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

	public token: Token;
	public secret: string;
	private subscription: Subscription;
	public claimsSet1 = [
		{
			value: 'payload.exp',
			toString: dateFormatter
		},
		{
			value: 'payload.iat',
			toString: dateFormatter
		},
		'payload.iss',
		'payload.aud',
		'payload.sub',
		{
			value: 'payload.auth_time',
			toString: dateFormatter
		},
		'payload.acr'
	];
	public claimsSet2 = [
		'payload.scope',
		'payload.email_verified',
		'payload.name',
		'payload.given_name',
		'payload.family_name',
		'payload.email'
	];

	constructor(private tokenService: TokenService) { }

	ngOnInit() {
		this.subscription = this.tokenService.data.subscribe((res: Token) => {
			this.token = res;
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onSecretChange(e) {
		console.log(`Secret changed ${e}`);
	}

}
