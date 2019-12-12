import { Component } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	public showNav = false;

	constructor() { }

	toggleNav() {
		this.showNav = !this.showNav;
	}

}
