import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenTestingModule } from '../../testing/testing.module';
import { AuthTypePipe } from '../../pipes/auth-type.pipe';
import { AuthenticationInfoComponent } from './authentication-info.component';

describe('AalInfoComponent', () => {
	let component: AuthenticationInfoComponent;
	let fixture: ComponentFixture<AuthenticationInfoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TokenTestingModule
			],
			declarations: [
				AuthTypePipe,
				AuthenticationInfoComponent
			]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AuthenticationInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
