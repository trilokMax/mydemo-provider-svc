import { Component, OnInit, Input } from '@angular/core';
import { Token } from 'src/app/shared/models/token';

@Component({
	selector: 'app-suggested-claims',
	templateUrl: './suggested-claims.component.html',
	styleUrls: ['./suggested-claims.component.scss']
})
export class SuggestedClaimsComponent implements OnInit {

	@Input() token: Token;
	@Input() claims: any[];
	parsedClaims: any[];

	constructor() { }

	ngOnInit() {
		this.parsedClaims = this.claims.map((claim) => {
			const value = claim.value ? claim.value : claim;
			const parts = value.split('.');
			const tokenPart = this.token[parts[0]].decoded[parts[1]] || '';
			return {
				name: parts[1],
				value: claim.toString.call(tokenPart.toString())
			};
		});
	}

}
