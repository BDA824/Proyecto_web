import axios from 'axios';

const BrokerAPI = axios.create({
    baseURL: "http://localhost:8000/broker/api/v1/users/"
});

export const createUser = (data) => {
    return BrokerAPI.post("http://localhost:8000/broker/api/v1/create-user/", data)
};

export const loginUser = (data) => {
    return axios.post("http://localhost:8000/login", data)
};
