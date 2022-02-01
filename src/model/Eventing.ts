//all event tied to user

type Callback = () => void;

const USER_ENDPOINT = 'http://localhost:3000/users';

export class Eventing {
	events: { [key: string]: Callback[] } = {};

	on = (eventName: string, callback: Callback): void => {
		const handlers = this.events[eventName] || []; //Callback[] or undefined
		handlers.push(callback);
		this.events[eventName] = handlers;
	};

	trigger = (eventName: string): void => {
		const handlers = this.events[eventName];

		if (!handlers || handlers.length === 0) {
			return;
		}

		handlers.forEach((cb) => cb());
	};
}
