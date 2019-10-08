import React from 'react';

const Filter = (props) => {
    return (
        <div>
            filter shown with: <input type="text" onChange={props.onFilterInputChanged} />
        </div>
    )
}

export default Filter;
