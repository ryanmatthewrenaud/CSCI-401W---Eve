import jwtDecode from 'jwt-decode';
import axiosInstance from '../axios';
import { store } from '../../stores/store';
import { login, logout } from '../../stores/slices/userSlice';


class TokenService {
    login(data) {
        return axiosInstance.post("/auth/login/", data).then(response => {
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            store.dispatch(login(jwtDecode(response.data.access)));
            return response.status;
        }).catch(error => {
            if (error.response.status === 401) {
                return Error("Invalid credentials.");
            }
        })
    }

    verify(data) {
        return axiosInstance.post('/auth/verify/', data)
            .then(() => {
                return true;
            })
            .catch(err => {
                return false;
            })
    }

    refresh(data) {
        return axiosInstance.post('/auth/refresh/', data)
            .then((response) => {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                store.dispatch(login(jwtDecode(response.data.access)));
            })
            .catch(err => {
                store.dispatch(logout())
            });
    }

}

export default new TokenService();