import axios from 'axios';

const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const createPerson = (personData) => {
    const request = axios.post(baseUrl, personData);
    return request.then(response => response.data);
}

const editPerson = (personId, personData) => {
    const request = axios.put(baseUrl + `/${personId}`, personData);
    return request.then(response => response.data);
}

const deletePerson = (personId) => {
    const request = axios.delete(baseUrl + `/${personId}`);
    return request.then(response => response.data);
}

export default { getAllPersons, createPerson, editPerson, deletePerson };