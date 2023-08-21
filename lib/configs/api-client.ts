import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'http://www.omdbapi.com'
});

apiClient.interceptors.request.use((config) => {
    config.params['apikey'] = import.meta.env['VITE_OMDB_API_KEY'];
    config.params = config.params || {};
    console.log(config.params);
    return config;
});
