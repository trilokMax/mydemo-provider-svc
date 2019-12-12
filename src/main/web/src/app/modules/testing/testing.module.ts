import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule,
		HttpClientModule,
		NgbModule,
		ReactiveFormsModule,
		FormsModule,
		RouterTestingModule,
		HttpClientTestingModule
	],
	exports: [
		CommonModule,
		RouterModule,
		HttpClientModule,
		NgbModule,
		ReactiveFormsModule,
		FormsModule,
		RouterTestingModule,
		HttpClientTestingModule
	]
})
export class TestingModule { }
