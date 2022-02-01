// --Store date
//private data: UserProps
// --Retrieve and Update
//get(propName: string): (string | number)
//set(update: UserProps): void
// --Register an eventHandler with this object
//on(eventName: string, callback:()=>{})
// -- Tell other part that something has changed
//trigger(eventName:string):void
// -- fetch some data from the server about particular user
// fetch():Promise
// -- save this user to server
// save():Promise

import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Model } from './Model';
import { ApiSync } from './ApiSync';
import { Collection } from './Collection';

export interface UserProps {
	id?: number;
	name?: string;
	age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
	static buildUser(attrs: UserProps): User {
		return new User(
			new Attributes<UserProps>(attrs),
			new Eventing(),
			new ApiSync<UserProps>(rootUrl)
		);
	}

	static buildUserCollection(): Collection<User, UserProps> {
		return new Collection<User, UserProps>(
			'http://localhost:3000/users',
			User.buildUser
		);
	}

	setRandomAge(): void {
		const age = Math.round(Math.random() * 100);
		this.set({ age });
	}
}
