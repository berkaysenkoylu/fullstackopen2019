import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from '../../BlogList/Blog/Blog';

// 5.14
test('test to see if like button is pressed twice, the event handler function passed in the components props is called twice', () => {
	const blog = {
		title: 'Demo',
		author: 'Mr. Test Demo',
		url: 'www.test.com',
		likes: 9,
		user: {
			username: 'Test'
		}
	};

	const mockHandler = jest.fn();

	const component = render(
		<Blog blog={blog} likedBlogPost={mockHandler} />
	);

	const likeButton = component.getByText('Like');
	fireEvent.click(likeButton);
	fireEvent.click(likeButton);

	expect(mockHandler.mock.calls.length).toBe(2);
});

test('test to see by default only name and author of the blogpost are shown', () => {
	const blog = {
		title: 'Demo',
		author: 'Mr. Test Demo',
		url: 'www.test.com',
		likes: 9,
		user: {
			username: 'Test'
		}
	};

	const mockHandler = jest.fn();

	const component = render(
		<Blog blog={blog} likedBlogPost={mockHandler} />
	);

	const blogHeader = component.container.querySelector('.BlogHeader');
	const blogContent = component.container.querySelector('.BlogContent');
	// console.log(blogContent.classList);

	// component.debug();

	// Before clicking, in blogContent element we only have BlogContent class,
	// which is a default class and blogContent is by default not visible.
	expect(blogContent.classList.contains('BlogContentReveal')).toBe(false);

	// If we click on the blog header element, we will have .BlogContent and
	// .BlogContentRevealed in the blogContent element
	fireEvent.click(blogHeader);

	expect(blogContent.classList.contains('BlogContentReveal')).toBe(true);
});