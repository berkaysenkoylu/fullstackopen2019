const response = {
	message: 'Successfully get all the blogs',
	blogs: [
		{
			'_id': '5daee11ce432a92c10532448',
			'title': 'Life 103',
			'author': 'Frobella Donovic',
			'url': 'www.donovic.com/life102',
			'likes': 123422,
			'user': {
				'_id': '5dac657f5e3bba28ec978cd3',
				'username': 'John',
				'name': 'John Doe'
			}
		},
		{
			'_id': '5daee17de432a92c10532449',
			'title': 'Life 101',
			'author': 'Frobenius Nielsen',
			'url': 'www.donovic.com/life102',
			'likes': 12,
			'user': {
				'_id': '5dac657f5e3bba28ec978cd3',
				'username': 'John',
				'name': 'John Doe'
			}
		},
		{
			'_id': '5db71dca68edb80020e0844b',
			'title': 'Demo title',
			'author': 'Johannes Skertel',
			'url': 'www.demo.de/test',
			'likes': 2,
			'user': {
				'_id': '5dad873f488254220070683b',
				'username': 'Frobella',
				'name': 'Frobella Donovic'
			}
		}
	]
};

export const getAll = () => {
	return Promise.resolve(response);
};