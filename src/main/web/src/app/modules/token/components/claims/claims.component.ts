import { Component, Input, OnInit } from '@angular/core';
import { TokenPart } from 'src/app/shared/models/token-part';
import { stringify } from 'querystring';

@Component({
	selector: 'app-token-claims',
	templateUrl: './claims.component.html',
	styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit  {

	@Input() title = 'Claims';
	@Input() tokenPart: TokenPart;
	isString; boolean;

	constructor() { }

	ngOnInit() {
		this.isString = typeof this.tokenPart.decoded === 'string';
	}

}
