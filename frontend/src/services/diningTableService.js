import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tables';

export const getTables = async () => {
    const response = await axios.get(`${API_URL}/tables`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

export const addTable = async (table) => {
    const response = await axios.post(API_URL, table, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

export const updateTable = async (id, table) => {
    const response = await axios.put(`${API_URL}/tables/${id}`, table, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

export const deleteTable = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};
