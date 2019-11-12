import { useState } from 'react';

export const useField = (elementType, elementConfig) => {
	const [value, setValue] = useState('');

	const onChange = (event) => {
		setValue(event.target.value);
	};

	const clear = () => {
		setValue('');
	};

	return {
		elementType,
		elementConfig,
		value,
		onChange,
		clear
	};
};
