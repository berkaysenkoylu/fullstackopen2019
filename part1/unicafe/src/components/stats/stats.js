import React from 'react';

import Stat from './stat/stat';

const stats = (props) => {
    
    let statistics = null;
    if(props.data.total <= 0){
        return (<p>No feedback given</p>);
    }
    else {
        statistics = Object.keys(props.data).map(d => {
            return <Stat key={d} name={d} amount={props.data[d]} />
        });
    }

    return (
        <table>
            <tbody>
                {statistics}
            </tbody>
        </table>
    )
}

export default stats;
