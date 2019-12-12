import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenTestingModule, TokenTestingData } from '../../testing/testing.module';
import { SecretComponent } from '../../components/secret/secret.component';
import { TokenInfoComponent } from '../../components/token-info/token-info.component';
import { BehaviorSubject } from 'rxjs';
import { DetailComponent } from './detail.component';
import { ClaimsComponent } from './../../components/claims/claims.component';
import { TokenService } from 'src/app/shared/services/token.service';
import { Token } from 'src/app/shared/models/token';

class MockTokenService {
	data: BehaviorSubject<Token> = new BehaviorSubject(new Token(TokenTestingData.token.token));
}

let tokenService: TokenService;

describe('DetailComponent', () => {

	let component: DetailComponent;
	let fixture: ComponentFixture<DetailComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TokenTestingModule
			],
			declarations: [
				DetailComponent,
				SecretComponent,
				TokenInfoComponent,
				ClaimsComponent
			],
			providers: [
				{ provide: TokenService, useClass: MockTokenService }
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DetailComponent);
		component = fixture.componentInstance;
		tokenService = fixture.debugElement.injector.get(TokenService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

});
