import { Token } from './token';
import { TokenTestingData } from 'src/app/modules/token/testing/testing.module';

describe('Token', () => {
	it('should create an instance', () => {
		expect(new Token(TokenTestingData.token.token, TokenTestingData.token.signatureEncoded)).toBeTruthy();
	});
});
