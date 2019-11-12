import React from 'react';
import { render, waitForElement } from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';

describe('<App />', () => {
	test('renders only login form if the user is not logged into the application', async () => {
		let component;

		component = render(
			<App />
		);
		component.rerender(<App />);

		const login = await waitForElement(
			() => component.container.querySelector('.Login')
		);

		const blogs = component.container.querySelectorAll('.Notes');

		// Expect there is a login component
		expect(login).not.toBeNull();
		expect(login).toHaveTextContent('Login to Application');

		// Expect there is not a list of blogs
		expect(blogs.length).toBe(0);
	});

	test('blog posts are rendered when user is logged in', async () => {
		const user = {
			username: 'tester',
			token: '1231231214',
			userId: 'adasdiwe89789asd'
		};

		localStorage.setItem('username', JSON.stringify(user.username));
		localStorage.setItem('token', JSON.stringify(user.token));
		localStorage.setItem('userId', JSON.stringify(user.userId));

		let component;

		component = render(
			<App />
		);
		component.rerender(<App />);

		await waitForElement(
			() => component.container.querySelector('.Blog')
		);

		//component.debug();

		const blogs = component.container.querySelectorAll('.Blog');
		const loggedInUser = component.container.querySelector('.Username');

		// Expect there is a logged in user
		expect(loggedInUser).not.toBeNull();
		expect(loggedInUser).toHaveTextContent(
			'"tester" logged in'
		);

		// Expect there is a list of blogs
		expect(blogs.length).toBe(3);
	});
});