
export default class ApiService {

    static getBaseUrl = () => {
        let DEV_URL = '';
        DEV_URL = 'https://vfield.co/api';
        // https://vfieldpharma.herokuapp.com/api
        return DEV_URL;
    }
    //
    static socketBaseUrl = () => {
        let SOCKET_URL = '';
        SOCKET_URL = 'https://vfield.co';
        return SOCKET_URL;
    }
}