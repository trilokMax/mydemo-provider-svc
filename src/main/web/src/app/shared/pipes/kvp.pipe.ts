import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'kvp'
})
export class KvpPipe implements PipeTransform {

	transform(obj: any): any {
		return typeof obj === 'string' ? obj : Object.keys(obj).map((key: string) => {
			return {key, value: typeof obj[key] === 'string' ? obj[key] : JSON.stringify(obj[key])};
		});
	}

}
