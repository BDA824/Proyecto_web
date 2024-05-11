import axios from 'axios';

const BrokerAPI = axios.create({
    baseURL: "http://localhost:8000/broker/api/v1/users/"
});

export const createUser = (data) => {
    return BrokerAPI.post("/", data)
};