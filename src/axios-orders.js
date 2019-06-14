import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-44afa.firebaseio.com/'
})

export default instance;