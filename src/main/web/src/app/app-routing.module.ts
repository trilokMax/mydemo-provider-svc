import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedRoutingModule } from './shared/shared-routing.module';
import { TokenRoutingModule } from './modules/token/token-routing.module';
import { routes as appRoutes } from 'src/app/app.routes';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: appRoutes.token },
	{ path: '**', redirectTo: appRoutes.token },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		SharedRoutingModule,
		TokenRoutingModule
	],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
