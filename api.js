import axios from 'axios';

export const getCPUs = async () => {
    const response = await axios.get('http://localhost:5000/api/cpus');
    return response.data;
};

export const getGPUs = async () => {
    const response = await axios.get('http://localhost:5000/api/gpus');
    return response.data;
};

export const getRAMs = async () => {
    const response = await axios.get('http://localhost:5000/api/rams');
    return response.data;
};

export const getMotherboards = async () => {
    const response = await axios.get('http://localhost:5000/api/motherboards');
    return response.data;
};

export const getSSDs = async () => {
    const response = await axios.get('http://localhost:5000/api/ssds');
    return response.data;
};

export const getPowerSupplies = async () => {
    const response = await axios.get('http://localhost:5000/api/power_supplies');
    return response.data;
};

export const getCases = async () => {
    const response = await axios.get('http://localhost:5000/api/cases');
    return response.data;
};

export const getCoolers = async () => {
    const response = await axios.get('http://localhost:5000/api/coolers');
    return response.data;
};

export const getMonitors = async () => {
    const response = await axios.get('http://localhost:5000/api/monitors');
    return response.data;
};

export const getKeyboards = async () => {
    const response = await axios.get('http://localhost:5000/api/keyboards');
    return response.data;
};

export const checkCompatibility = async (components) => {
    const response = await axios.post('http://localhost:5000/api/compatibility', { components });
    return response.data;
};

export const getUserBuilds = async (userId) => {
    const response = await axios.get(`http://localhost:5000/api/users/${userId}/pcbuilds`);
    return response.data;
};
