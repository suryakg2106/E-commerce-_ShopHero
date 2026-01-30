import axios from 'axios'

const API_BASE = 'http://localhost:4000/'

const Api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true 
});

export default Api;
