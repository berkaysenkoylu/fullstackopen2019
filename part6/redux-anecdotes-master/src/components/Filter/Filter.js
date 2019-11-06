import React from 'react';
import { connect } from 'react-redux';

import { setFilter } from '../../reducers/filterReducer';

const Filter = (props) => {
    const handleChange = (event) => {
        props.setTheFilter(event.target.value);
    }

    const style = {
        marginBottom: 30
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTheFilter: (value) => dispatch(setFilter(value))
    };
};

export default connect(null, mapDispatchToProps)(Filter);
