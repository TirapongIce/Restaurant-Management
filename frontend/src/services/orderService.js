import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

export const getMenu= async () => {
    const response = await axios.get(`${API_URL}/menu`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

export const getOrders = async () => {
    const response = await axios.get(`${API_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

export const addOrder = async (order) => {
    const response = await axios.post(`${API_URL}/order`, order, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

export const updateOrder = async (id, order) => {
    const response = await axios.put(`${API_URL}/${id}`, order, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

export const deleteOrder = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};
export const completeOrder = async (id) => {
    const response = await axios.put(`${API_URL}/complete/${id}`, {}, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};
export const cancelOrder = async (id) => {
    const response = await axios.put(`${API_URL}/cancel/${id}`, {}, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

