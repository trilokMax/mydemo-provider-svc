import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'authType'
})
export class AuthTypePipe implements PipeTransform {

	transform(value: string | number): any {
		switch(value.toString().toLowerCase()) {
			case 'none':
				return {
					type: 'Authentication Type 1',
					description: 'Memorized secret (Authentication Type 1, AAL 1)'
				};
			case 'otp':
				return {
					type:  'Authentication Type 2',
					description: 'Memorized secret with single factor time-based OTP  (Authentication Type 2, AAL 2)'
				};
			case 'totp':
				return {
					type:  'Authentication Type 3',
					description: 'Memorized secret with out of band OTP  (Authentication Type 3, AAL 3)'
				};
			default:
				return {
					type: 'Unknown Authentication Type',
					description: ''
				};
		}
	}

}
