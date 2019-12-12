import { NgModule } from '@angular/core';
import { TestingModule } from 'src/app/modules/testing/testing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [],
	imports: [
		TestingModule,
		SharedModule
	],
	exports: [
		TestingModule,
		SharedModule
	]
})
export class TokenTestingModule { }

export const TokenTestingData = {
	token: {
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
		secret: 'your-256-bit-secret',
		signatureEncoded: false
	},
	claims: [
		'payload.iat',
		'payload.name',
		'payload.sub'
	]
};
