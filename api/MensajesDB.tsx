import axios from 'axios';

const MensajesDB = axios.create({
    baseURL: 'https://alertaewbs.site',
    timeout: 1000
});

export default MensajesDB;