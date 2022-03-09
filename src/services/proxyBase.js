import axios from 'axios';
import { getBaseUrlApi } from '@helpers/index';

const baseURL = getBaseUrlApi();
console.info('baseURL', baseURL);
const getConfigAxios = () => ({
  baseURL,
  timeout: 110000,
  headers: {
    Authorization: `Bearer token`
  }
});

const proxyBase = axios.create(getConfigAxios());

export default proxyBase;
