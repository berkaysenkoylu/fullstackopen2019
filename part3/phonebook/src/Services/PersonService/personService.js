import axios from 'axios';

const baseUrl = "/api/persons";

const getAllPersons = () => {
    const request = axios.get(baseUrl);
    return request.then(response => {
        //console.log(response);
        return response.data.data;
    });
}

const createPerson = (personData) => {
    const request = axios.post(baseUrl, personData);
    return request.then(response => {
        // console.log(response);
        return response.data.data;
    });
}

const editPerson = (personId, personData) => {
    const request = axios.put(baseUrl + `/${personId}`, personData);
    return request.then(response => response.data.data);
}

const deletePerson = (personId) => {
    const request = axios.delete(baseUrl + `/${personId}`);
    return request.then(response => response.data);
}

export default { getAllPersons, createPerson, editPerson, deletePerson };