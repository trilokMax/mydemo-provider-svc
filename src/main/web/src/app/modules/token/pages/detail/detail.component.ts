import { Component, OnInit, OnDestroy } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';
import { Token } from 'src/app/shared/models/token';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-token-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

	public token: Token;
	public secret: string;
	private subscription: Subscription;

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
