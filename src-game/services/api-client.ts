import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '65edf91f855e4df69b0d4e292b2f5d7d'
    }
})