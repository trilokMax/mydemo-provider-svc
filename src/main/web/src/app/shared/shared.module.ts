import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { KvpPipe } from './pipes/kvp.pipe';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
	declarations: [
		KvpPipe,
		HeaderComponent,
		FooterComponent,
		WelcomeComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		HttpClientModule,
		NgbModule,
		ReactiveFormsModule,
		FormsModule,
		SharedRoutingModule
	],
	exports: [
		CommonModule,
		RouterModule,
		NgbModule,
		ReactiveFormsModule,
		FormsModule,
		KvpPipe,
		HeaderComponent,
		FooterComponent,
		WelcomeComponent
	]
})
export class SharedModule { }
