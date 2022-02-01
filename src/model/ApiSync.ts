import axios, { AxiosPromise, AxiosResponse } from 'axios';

const USER_ENDPOINT = 'http://localhost:3000/users';

import { UserProps } from './User';

interface HasId {
	id?: number;
}

export class ApiSync<T extends HasId> {
	//we need some data from user
	constructor(public rootUrl: string) {}

	//return promise, User will handle the rest(save to itself)
	fetch(id: number): AxiosPromise {
		return axios.get(`${this.rootUrl}/${id}`);
	}

	//return promise, to notify if success!
	save(data: T): AxiosPromise {
		const { id } = data;

		if (id) {
			//put
			return axios.put(`${this.rootUrl}/${id}`, data);
		} else {
			//post
			return axios.post(`${this.rootUrl}`, data);
		}
	}
}
