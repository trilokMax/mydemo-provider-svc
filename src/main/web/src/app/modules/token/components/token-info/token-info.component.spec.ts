import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenTestingModule, TokenTestingData } from '../../testing/testing.module';

import { TokenInfoComponent } from './token-info.component';
import { Token } from 'src/app/shared/models/token';

describe('TokenInfoComponent', () => {
	let component: TokenInfoComponent;
	let fixture: ComponentFixture<TokenInfoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TokenTestingModule
			],
			declarations: [ TokenInfoComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TokenInfoComponent);
		component = fixture.componentInstance;
		component.token = new Token(TokenTestingData.token.token, TokenTestingData.token.signatureEncoded);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
