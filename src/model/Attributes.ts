export class Attributes<T> {
	constructor(private data: T) {}

	get = <K extends keyof T>(key: K): T[K] => {
		return this.data[key];
	};

	set = (update: T): void => {
		Object.assign(this.data, update); //take secound object to overwrite 1
	};

    getAll = (): T => {
        return this.data;
    }
}
