import { User, UserProps } from '../model/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
	template(): string {
		return `
		<div>
			<input id="name" type="text"  placeholder=${this.model.get('name')} />
			<button id="change-name">Change name</button>
			<br>
			<button id="set-age">Set random age</button>
		</div>
        `;
	}

	onButtonClick() {
		console.log('hi there');
	}

	onMouseOver = (): void => {
		console.log('mouse over!');
	};

	onSetAgeClick = (): void => {
		console.log('Set age click');
		this.model.setRandomAge();
	};

	onChangeNameClick = (): void => {
		const input: HTMLInputElement | null = this.parent.querySelector('#name');

		if (input) {
			const name = input.value;
			this.model.set({ name });
			console.log(name);
		}
	};

	eventsMap(): { [key: string]: () => void } {
		return {
			// 'mouseenter:h1': this.onMouseOver,
			'click:#set-age': this.onSetAgeClick,
			'click:#change-name': this.onChangeNameClick,
		};
	}
}
