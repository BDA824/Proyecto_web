import axios from 'axios';

const BrokerAPI = axios.create({
    baseURL: "http://localhost:8000/broker/api/v1"
});

export const createUser = (data) => {
    console.log("Datos enviados:", data); 
    return BrokerAPI.post("/create-user/", data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

export const loginUser = (data) => {
    return axios.post("http://localhost:8000/login", data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
};
