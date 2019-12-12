import { AuthTypePipe } from './auth-type.pipe';

describe('AuthTypePipe', () => {
	it('create an instance', () => {
		const pipe = new AuthTypePipe();
		expect(pipe).toBeTruthy();
	});
	it('should return auth level 1', () => {
		const pipe = new AuthTypePipe();
		expect(pipe.transform('none').type).toEqual('Authentication Type 1');
	});
	it('should return auth level 2', () => {
		const pipe = new AuthTypePipe();
		expect(pipe.transform('otp').type).toEqual('Authentication Type 2');
	});
	it('should return auth level 3', () => {
		const pipe = new AuthTypePipe();
		expect(pipe.transform('totp').type).toEqual('Authentication Type 3');
	});
	it('should return auth level 1 when capitalization doesnt match', () => {
		const pipe = new AuthTypePipe();
		expect(pipe.transform('NONE').type).toEqual('Authentication Type 1');
	});
	it('should handle unndefined auth levels', () => {
		const pipe = new AuthTypePipe();
		expect(pipe.transform('peanutbutter').type).toEqual('Unknown Authentication Type');
	});
});
