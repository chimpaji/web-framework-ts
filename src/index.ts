import { User } from './model/User';
import { UserForm } from './views/UserForm';

const root: HTMLElement | null = document.querySelector('#root');

const user = User.buildUser({ name: 'NAME', age: 120 });

if (root) {
	const userForm = new UserForm(root, user);
	userForm.render();
} else {
	throw new Error('Root element not found');
}
