import React from 'react';

const SimpleBlog = (props) => {
	return (
		<div className="SimpleBlog">
			<div className="BlogHeader">
				{props.title} {props.author}
			</div>
			<div className="BlogLikes">
				blog has {props.likes} likes
				<button onClick={props.onClick}>like</button>
			</div>
		</div>
	);
};

export default SimpleBlog;