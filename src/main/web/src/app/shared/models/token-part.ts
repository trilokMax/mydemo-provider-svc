export class TokenPart {
	encoded: string;
	decoded: any;
	constructor(tokenPart: string, preventDecode?: boolean) {
		this.encoded = tokenPart;
		this.decoded = preventDecode ? tokenPart : JSON.parse(atob(tokenPart));
	}
}
