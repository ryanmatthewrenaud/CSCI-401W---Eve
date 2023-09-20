import axios from 'axios';
import TokenService from './services/token.service';
import { store } from '../stores/store';
import { logout } from '../stores/slices/userSlice';

const baseURL = "http://localhost:8000/api";

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
})


axiosInstance.interceptors.request.use(
    config => {
        if (config.url !== '/auth/register/') {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        }
        return config;
    }
)

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            // Access Token was expired
            if (error.response.status === 401 && originalRequest.url === baseURL + '/auth/refresh') {
                window.location.href = '/';
                return Promise.reject(error);
            }

            if (error.response.data.code === "token_not_valid" &&
                error.response.status === 401 &&
                error.response.statusText === "Unauthorized") {
                const refreshToken = localStorage.getItem('refresh_token');

                if (refreshToken) {
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    const now = Math.ceil(Date.now() / 1000);

                    if (tokenParts.exp > now) {
                        TokenService.refresh({ refresh: refreshToken }).then(() => {
                            return axiosInstance(originalRequest)
                        })

                    } else {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                        store.dispatch(logout());
                    }
                } else {
                    store.dispatch(logout());
                    window.location.href = '/';
                }
            }

            // specific error handling done elsewhere
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;