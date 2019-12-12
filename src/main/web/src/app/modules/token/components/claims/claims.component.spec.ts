import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenTestingModule, TokenTestingData } from '../../testing/testing.module';
import { ClaimsComponent } from './claims.component';
import { Token } from 'src/app/shared/models/token';

const token = new Token(TokenTestingData.token.token, TokenTestingData.token.signatureEncoded);

describe('HeaderComponent', () => {

	let component: ClaimsComponent;
	let fixture: ComponentFixture<ClaimsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TokenTestingModule
			],
			declarations: [ ClaimsComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ClaimsComponent);
		component = fixture.componentInstance;
		component.tokenPart = token.header;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

});
