import React, { useState, useEffect } from 'react';

const Filter = (props) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        if (props.allGenreOptions)
            setGenres([...props.allGenreOptions, "all genres"]);
    }, [props.allGenreOptions]);

    let filterButtons = [];
    filterButtons = genres.map(genre => {
        return <button key={genre} onClick={() => props.selectedGenre(genre)}>{genre}</button>
    });

    return (
        <div>
            {filterButtons}
        </div>
    )
}

export default Filter;