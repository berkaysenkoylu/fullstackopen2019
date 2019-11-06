import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseURL);

    return response.data;
}

const createAnecdote = async (data) => {
    const response = await axios.post(baseURL, data);

    return response.data;
}

const voteAnecdote = async (id) => {
    const fetchedData = await axios.get(baseURL + `/${id}`);
    const votedAnecdote = fetchedData.data;

    votedAnecdote.votes++;

    const response = await axios.put(baseURL + `/${id}`, votedAnecdote);
    return response.data;
}

export default { getAll, createAnecdote, voteAnecdote }