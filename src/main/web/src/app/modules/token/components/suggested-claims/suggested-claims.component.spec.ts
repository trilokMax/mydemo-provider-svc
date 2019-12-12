import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenTestingModule, TokenTestingData } from '../../testing/testing.module';
import { SuggestedClaimsComponent } from './suggested-claims.component';
import { Token } from 'src/app/shared/models/token';

const token = new Token(TokenTestingData.token.token, TokenTestingData.token.signatureEncoded);


describe('SuggestedClaimsComponent', () => {
	let component: SuggestedClaimsComponent;
	let fixture: ComponentFixture<SuggestedClaimsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TokenTestingModule
			],
			declarations: [
				SuggestedClaimsComponent
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SuggestedClaimsComponent);
		component = fixture.componentInstance;
		component.token = token;
		component.claims = TokenTestingData.claims;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
