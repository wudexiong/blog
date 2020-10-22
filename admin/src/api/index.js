import axios from 'axios';

const api = axios.create({
  timeout: 1000 * 10,
  baseURL: 'http://localhost:7001/admin/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  
});

// 添加请求拦截器
api.interceptors.request.use((config) => {
  config.data = JSON.stringify(config.data);
  return config;
});
// 添加响应拦截器
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.log('TCL: error', error);
  return Promise.reject(error);
});

export default api
