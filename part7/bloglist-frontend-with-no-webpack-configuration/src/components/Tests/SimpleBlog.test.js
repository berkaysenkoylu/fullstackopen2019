import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

// 5.13
test('renders the content', () => {
	const blogPost = {
		title: 'Test title',
		author: 'Mr. McTest',
		likes: 19
	};

	const component = render(
		<SimpleBlog title={blogPost.title} author={blogPost.author} likes={blogPost.likes} />
	);

	const headerDiv = component.container.querySelector('.BlogHeader');
	const likesDiv = component.container.querySelector('.BlogLikes');

	expect(headerDiv).toHaveTextContent(
		'Test title Mr. McTest'
	);
	expect(likesDiv).toHaveTextContent(
		'blog has 19 likes'
	);
});

// 5.14* I accidentally did this part for the like button of my application. See: Blog.test.js
// I realized this before the submission. Adding this for SimpleBlog.js as well.abs
test('button is pressed twice, the event handler function is called twice', () => {
	const blogPost = {
		title: 'Test title',
		author: 'Mr. McTest',
		likes: 19
	};

	const mockHandler = jest.fn();

	const component = render(
		<SimpleBlog title={blogPost.title} author={blogPost.author} likes={blogPost.likes} onClick={mockHandler} />
	);

	const likeButton = component.getByText('like');

	fireEvent.click(likeButton);
	fireEvent.click(likeButton);

	expect(mockHandler.mock.calls.length).toBe(2);
});