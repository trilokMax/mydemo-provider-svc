import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routes as appRoutes } from 'src/app/app.routes';
import { RootComponent } from './pages/root/root.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { TokenResolverService } from './resolvers/token.resolver';

const routes: Routes = [
	{ path: appRoutes.token, component: RootComponent, resolve: {tokenInfo: TokenResolverService}, children: [
		{ path: '', component: HomeComponent },
		{ path: 'detail', component: DetailComponent }
	]}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	providers: [
		TokenResolverService
	],
	exports: [
		RouterModule
	]
})
export class TokenRoutingModule { }
