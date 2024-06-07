import axios from 'axios';

const BrokerAPI = axios.create({
    baseURL: "http://localhost:8000"
});

export const createUser = (data) => {
    return BrokerAPI.post("/broker/api/v1/create-user/", data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

export const saveTransactionToJSON = async (userId, actionId, userCountryId) => {
    try {
        const data = {
            user: userId,
            action: actionId,
            country: userCountryId, // Incluimos userCountryId en los datos enviados al backend
        };
        console.log("Datos a enviar:", data); // Agregar registro para verificar los datos
        const response = await BrokerAPI.post('/broker/api/v1/buys/', data);
        return response.data;
    } catch (error) {
        console.error('Error al guardar la transacción:', error);
        throw error;
    }
};

export const loginUser = async (data) => {
    try {
        const response = await BrokerAPI.post("/login", data, {
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

export const getUserProfile = async (userId) => {
    try {
        const response = await BrokerAPI.get(`/broker/api/v1/users/${userId}/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserGestora = async (country) => {
    try {
        const response = await BrokerAPI.get(`http://localhost:8000/api/managers/${country}`); // Corregido la URL
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserBalance = async (country) => {
    try {
        const response = await BrokerAPI.get(`http://localhost:8000/api/brokers/${country}`); // Corregido la URL
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserActions = async (country) => {
    try {
        const response = await BrokerAPI.get(`http://localhost:8000/api/actions/${country}`); // Corregido la URL
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
    return BrokerAPI.get(`http://localhost:8000/api/actions/${normalizedCountryName}`); // Corregido la URL
};

export const getGestorasByCountry = (countryName) => {
    const normalizedCountryName = normalizeCountryName(countryName);
    return BrokerAPI.get(`http://localhost:8000/api/managers/${normalizedCountryName}`); // Corregido la URL
};

export const getBrokersByCountry = (countryName) => {
    const normalizedCountryName = normalizeCountryName(countryName);
    return BrokerAPI.get(`http://localhost:8000/api/brokers/${normalizedCountryName}`); // Corregido la URL
};

export const joinBroker = (userId, brokerId) => {
    const userWallet = JSON.parse(localStorage.getItem('userWallet')) || {};
    userWallet.brokerId = brokerId;
    localStorage.setItem('userWallet', JSON.stringify(userWallet));
};

export const joinGestora = (userId, gestoraId) => {
    const userWallet = JSON.parse(localStorage.getItem('userWallet')) || {};
    userWallet.gestoraId = gestoraId;
    localStorage.setItem('userWallet', JSON.stringify(userWallet));
};

const normalizeCountryName = (countryName) => {
    return countryName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Nueva función getUserWallet
export const getUserWallet = () => {
    return JSON.parse(localStorage.getItem('userWallet')) || {};
};
