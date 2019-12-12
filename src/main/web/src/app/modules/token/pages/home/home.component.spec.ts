import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenTestingModule, TokenTestingData } from '../../testing/testing.module';
import { SecretComponent } from '../../components/secret/secret.component';
import { TokenInfoComponent } from '../../components/token-info/token-info.component';
import { BehaviorSubject } from 'rxjs';
import { HomeComponent } from './home.component';
import { AuthenticationInfoComponent } from './../../components/authentication-info/authentication-info.component';
import { SuggestedClaimsComponent } from './../../components/suggested-claims/suggested-claims.component';
import { MinimumTokenInfoComponent } from './../../components/minimum-token-info/minimum-token-info.component';
import { TokenService } from 'src/app/shared/services/token.service';
import { AuthTypePipe } from '../../pipes/auth-type.pipe';
import { Token } from 'src/app/shared/models/token';

class MockTokenService {
	data: BehaviorSubject<Token> = new BehaviorSubject(new Token(TokenTestingData.token.token));
}

let tokenService: TokenService;

describe('HomeComponent', () => {

	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TokenTestingModule
			],
			declarations: [
				HomeComponent,
				SecretComponent,
				TokenInfoComponent,
				AuthenticationInfoComponent,
				SuggestedClaimsComponent,
				MinimumTokenInfoComponent,
				AuthTypePipe
			],
			providers: [
				{ provide: TokenService, useClass: MockTokenService }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		tokenService = fixture.debugElement.injector.get(TokenService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

});
