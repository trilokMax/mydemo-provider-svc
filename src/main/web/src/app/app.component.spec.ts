import { TestBed, async } from '@angular/core/testing';
import { TestingModule} from './modules/testing/testing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TestingModule,
				SharedModule
			],
			declarations: [
				AppComponent
			]
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

});
