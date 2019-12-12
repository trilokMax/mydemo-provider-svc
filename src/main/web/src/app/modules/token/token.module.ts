import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RootComponent } from './pages/root/root.component';
import { HomeComponent } from './pages/home/home.component';
import { TokenInfoComponent } from './components/token-info/token-info.component';
import { ClaimsComponent } from './components/claims/claims.component';
import { SecretComponent } from './components/secret/secret.component';
import { DetailComponent } from './pages/detail/detail.component';
import { MinimumTokenInfoComponent } from './components/minimum-token-info/minimum-token-info.component';
import { SuggestedClaimsComponent } from './components/suggested-claims/suggested-claims.component';
import { AuthenticationInfoComponent } from './components/authentication-info/authentication-info.component';
import { AuthTypePipe } from './pipes/auth-type.pipe'

@NgModule({
	declarations: [
		RootComponent,
		HomeComponent,
		TokenInfoComponent,
		ClaimsComponent,
		SecretComponent,
		DetailComponent,
		MinimumTokenInfoComponent,
		SuggestedClaimsComponent,
		AuthenticationInfoComponent,
		AuthTypePipe
	],
	imports: [
		SharedModule
	]
})
export class TokenModule { }
