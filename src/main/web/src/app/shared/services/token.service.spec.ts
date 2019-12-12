import { TestBed } from '@angular/core/testing';
import { TestingModule } from 'src/app/modules/testing/testing.module';

import { TokenService } from './token.service';

describe('TokenService', () => {
	
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			TestingModule
		]
	}));

	it('should be created', () => {
		const service: TokenService = TestBed.get(TokenService);
		expect(service).toBeTruthy();
	});

});
