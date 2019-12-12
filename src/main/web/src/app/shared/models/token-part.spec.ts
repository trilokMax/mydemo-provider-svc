import { TokenPart } from './token-part';
import { Token } from './token';
import { TokenTestingData } from 'src/app/modules/token/testing/testing.module';

const token = new Token(TokenTestingData.token.token, TokenTestingData.token.signatureEncoded);

describe('TokenPart', () => {
	it('should create an instance', () => {
		expect(new TokenPart(token.payload.decoded, !TokenTestingData.token.signatureEncoded)).toBeTruthy();
	});
});
