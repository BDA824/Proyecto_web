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

export const loginUser = async (data) => {
    try {
        const response = await axios.post("http://localhost:8000/login", data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const { user } = response.data;
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userCountryId', user.country);
        return response;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = () => {
    return axios.post("http://localhost:8000/logout");
};

export const getActionsByCountry = (countryId) => {
    return BrokerAPI.get(`http://localhost:8000/api/actions/${countryId}`);
};

export const getGestorasByCountry = (countryId) => {
    console.log(countryId)
    return BrokerAPI.get(`http://localhost:8000/api/managers/${countryId}`);
};

export const getBrokersByCountry = (countryId) => {
    return BrokerAPI.get(`http://localhost:8000/api/brokers/${countryId}`);
};