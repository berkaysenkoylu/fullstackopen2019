import React from 'react';

const PersonForm = (props) => {
    return (
        <form onSubmit={props.onNewPersonAdded}>
            <div>
                name: <input value={props.name} onChange={props.nameInputChanged} />
            </div>
            <div>
                number: <input value={props.number} onChange={props.numberInputChanged} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
      </form>
    )
}

export default PersonForm;
