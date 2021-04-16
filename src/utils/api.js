import axios from 'axios';

const serverBaseUrl = `http://localhost/php/corerestapi`;

let accessToken = null;
if(localStorage.getItem('user-data') != null){
    const userLocalStorage = JSON.parse(localStorage.getItem('user-data'));
    accessToken = userLocalStorage.accessToken;
}

export const AuthApi = axios.create({
    baseURL: serverBaseUrl,
    headers: {
        Authorization: `bearer ${accessToken}`
    }
});