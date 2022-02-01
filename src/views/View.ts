import { Model } from '../model/Model';

export abstract class View<T extends Model<K>, K> {
	constructor(public parent: HTMLElement, public model: T) {
		this.bindModel();
	}

	abstract template(): string;
	abstract eventsMap(): { [key: string]: () => void };

	bindModel(): void {
		//add function on 'change' to re-render
		this.model.on('change', () => {
			this.render();
		});
	}

	render(): void {
		//create an html element w
		const template = document.createElement('template');
		//insert strign inside it to turn it into html
		template.innerHTML = this.template();
		//bindEvents to all target
		this.bindEvents(template.content);

		//append that new html to the target
		this.parent.replaceChildren(template.content);
	}

	bindEvents = (fragment: DocumentFragment): void => {
		const eventsMap = this.eventsMap();

		for (let eventKey in eventsMap) {
			const [eventName, selector] = eventKey.split(':');
			fragment
				.querySelectorAll(selector)
				.forEach((ele) => ele.addEventListener(eventName, eventsMap[eventKey]));
		}
	};
}
