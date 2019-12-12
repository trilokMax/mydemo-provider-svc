import { Component, Input } from '@angular/core';
import { Token } from 'src/app/shared/models/token';

@Component({
	selector: 'app-token-info',
	templateUrl: './token-info.component.html',
	styleUrls: ['./token-info.component.scss']
})
export class TokenInfoComponent {

	@Input() token: Token;

	constructor() { }

}
