import { TokenPart } from './token-part';

export class Token {
	header: TokenPart;
	payload: TokenPart;
	signature: TokenPart;
	constructor(token: string, signatureEncoded?: boolean) {
		const parts = token.split('.');
		this.header = new TokenPart(parts[0]);
		this.payload = new TokenPart(parts[1]);
		this.signature = new TokenPart(parts[2], !signatureEncoded);
	}
}
