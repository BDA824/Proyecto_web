import axios from 'axios';

const BrokerAPI = axios.create({
    baseURL: "http://localhost:8000"
});

export const createUser = (data) => {
    console.log("Datos enviados:", data); 
    return BrokerAPI.post("/broker/api/v1/create-user/", data, {
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

export const getUserGestora = async (country) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/managers/${country}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserBalance = async (country) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/brokers/${country}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserActions = async (country) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/actions/${country}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = () => {
    return axios.post("http://localhost:8000/logout");
};

export const getActionsByCountry = (countryName) => {
    const normalizedCountryName = normalizeCountryName(countryName);
    return BrokerAPI.get(`http://localhost:8000/api/actions/${normalizedCountryName}`);
};

export const getGestorasByCountry = (countryName) => {
    const normalizedCountryName = normalizeCountryName(countryName);
    console.log("Fetching gestoras for country:", countryName);
    return BrokerAPI.get(`http://localhost:8000/api/managers/${normalizedCountryName}`);
};

export const getBrokersByCountry = (countryName) => {
    const normalizedCountryName = normalizeCountryName(countryName);
    return BrokerAPI.get(`http://localhost:8000/api/brokers/${normalizedCountryName}`);
};

export const joinGestora = (userId, gestoraId) => {
    return BrokerAPI.post(`/users/${userId}/join-gestora/`, { gestoraId });
};

export const joinBroker = (userId, brokerId) => {
    return BrokerAPI.post(`/users/${userId}/join-broker/`, { brokerId });
};

const normalizeCountryName = (countryName) => {
    return countryName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
