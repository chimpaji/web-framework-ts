import axios, { AxiosResponse } from 'axios';
import { ApiSync } from './ApiSync';
import { Eventing } from './Eventing';
import { User } from './User';

export class Collection<T, K> {
	models: T[] = [];
	//events - on ,trigger
	events: Eventing = new Eventing();
	//fetch - save, retrieve

	constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

	get on() {
		return this.events.on;
	}

	get trigger() {
		return this.events.trigger;
	}

	fetch(): void {
		axios.get(this.rootUrl).then((response: AxiosResponse) => {
			response.data.forEach((value: K) => {
				this.models.push(this.deserialize(value));
			});

			this.trigger('change');
		});
	}
}
