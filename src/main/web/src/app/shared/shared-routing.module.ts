import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routes as appRoutes } from 'src/app/app.routes';

const routes: Routes = [];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class SharedRoutingModule { }
