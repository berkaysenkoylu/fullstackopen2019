// import React, { useState } from 'react';
import React from 'react';

import classes from './CreateBlog.module.css';
import Heading from '../../UI/Heading/Heading';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { createBlogPost } from '../../../services/blogs';

// With custom hook
import { useField } from '../../../hooks/index';

const CreateBlog = (props) => {
	// const [createBlogForm, setCreateBlogForm] = useState({
	// 	formControls: {
	// 		title: {
	// 			elementType: 'input',
	// 			elementConfig: {
	// 				type: 'text',
	// 				placeholder: 'Title'
	// 			},
	// 			value: ''
	// 		},
	// 		author: {
	// 			elementType: 'input',
	// 			elementConfig: {
	// 				type: 'text',
	// 				placeholder: 'Author'
	// 			},
	// 			value: ''
	// 		},
	// 		url: {
	// 			elementType: 'input',
	// 			elementConfig: {
	// 				type: 'text',
	// 				placeholder: 'URL'
	// 			},
	// 			value: ''
	// 		}
	// 	}
	// });
	const title = useField('input', { type: 'text', placeholder: 'Title' });
	const author = useField('input', { type: 'text', placeholder: 'Author' });
	const url = useField('input', { type: 'text', placeholder: 'URL' });


	// const onInputFieldChanged = (event, inputFieldName) => {
	// 	// Copy the state so that we can modify it immutably
	// 	const copiedCreateBlogForm = {...createBlogForm};

	// 	const copiedFormControls = {...copiedCreateBlogForm.formControls};

	// 	copiedFormControls[inputFieldName].value = event.target.value;

	// 	copiedCreateBlogForm.formControls = copiedFormControls;

	// 	setCreateBlogForm(copiedCreateBlogForm);
	// };

	const onCreateNewBlogHandler = (event) => {
		event.preventDefault();

		const newBlog = {
			title: title.value,
			author: author.value,
			url: url.value
		};

		createBlogPost(props.token, newBlog).then(response => {
			props.newBlogCreated(response.data);
			resetFormFields();
		}).catch(error => {
			console.log(error);
		});
	};

	const resetFormFields = () => {
		// WITH CUSTOM HOOK
		title.clear();
		author.clear();
		url.clear();

		// const copiedBlogForm = {...createBlogForm};

		// const copiedFormControls = {...copiedBlogForm.formControls};

		// Object.keys(copiedFormControls).forEach(formCtrl => {
		// 	copiedFormControls[formCtrl].value = '';
		// });

		// copiedBlogForm.formControls = copiedFormControls;

		// setCreateBlogForm(copiedBlogForm);
	};

	const onCancelBlogCreate = (event) => {
		event.preventDefault();

		props.blogCreateCancelled();
	};

	// let blogCreateForm = Object.keys(createBlogForm.formControls).map(formCtrl => {
	// 	return <Input
	// 		key={formCtrl}
	// 		label={formCtrl}
	// 		elementType={createBlogForm.formControls[formCtrl].elementType}
	// 		elementConfig={createBlogForm.formControls[formCtrl].elementConfig}
	// 		value={createBlogForm.formControls[formCtrl].value}
	// 		changed={(event) => onInputFieldChanged(event, formCtrl)} />;
	// });


	// NB: For 5.20; my solution was already sort of ready from the get go.
	// I outsourced 'input' as a component so that I could control
	// what kind of attributes HTML-input element can have. As can be
	// seen from the following, spread operator can be used in conjunction with
	// the advantages that are coming from custom hooks.

	return (
		<div className={classes.CreateBlog}>
			<Heading HeadingType='HeadingSecondary'>Create a new blog</Heading>
			<form onSubmit={(event) => onCreateNewBlogHandler(event)}>
				{/* {blogCreateForm} */}
				<Input
					label="title"
					{...title}
					changed={(event) => title.onChange(event)} />
				<Input
					label="author"
					{...author}
					changed={(event) => author.onChange(event)} />
				<Input
					label="url"
					{...url}
					changed={(event) => url.onChange(event)} />
				<div className={classes.CreateBlogButtonContainer}>
					<Button
						ButtonType='ButtonSuccess'
						ButtonSize='ButtonSmall'
						ButtonAlignment=''>Create</Button>
					<Button
						ButtonType='ButtonDanger'
						ButtonSize='ButtonSmall'
						ButtonAlignment=''
						clicked={(event) => onCancelBlogCreate(event)}>Cancel</Button>
				</div>
			</form>
		</div>
	);
};

export default CreateBlog;