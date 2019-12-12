import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenTestingModule } from '../../testing/testing.module';

import { RootComponent } from './root.component';

describe('RootComponent', () => {

	let component: RootComponent;
	let fixture: ComponentFixture<RootComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				TokenTestingModule
			],
			declarations: [ RootComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RootComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

});
