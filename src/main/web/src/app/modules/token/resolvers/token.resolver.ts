import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from 'src/app/shared/services/token.service';

@Injectable({
	providedIn: 'root'
})
export class TokenResolverService implements Resolve<any> {
	constructor(private tokenService: TokenService) { }
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
		return this.tokenService.get().pipe(
			map((res) => {
				return this.tokenService.setData(res.encoded, false);
			})
		);
	}
}
