import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-token-secret',
	templateUrl: './secret.component.html',
	styleUrls: ['./secret.component.scss']
})
export class SecretComponent implements OnInit, OnDestroy {

	@Input() secret: string;
	@Output() secretChange: EventEmitter<string> = new EventEmitter(true);
	subscriptions: Subscription;

	form: FormGroup;

	constructor() { }

	ngOnInit() {
		this.form = new FormGroup({
			secret: new FormControl(this.secret)
		});
		this.subscriptions = this.form.controls.secret.valueChanges.subscribe((value) => this.secretChange.emit(value));
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

}
