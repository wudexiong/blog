import axios from 'axios';
// let loadingInstance = null; // 这里是loading
const api = axios.create({
  baseURL: 'http://localhost:7001/default/',
  timeout: 1000 * 10,
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


export const getArticleList = () => {
  return new Promise((resolve)=>{
    api('getArticleList').then(
      (res)=>{
        resolve(res.data)
      }
    )
  })
}
export const getArticleById = (id) => {
  return new Promise((resolve)=>{
    api('getArticleById/'+ id).then(
      (res)=>{
        resolve(res.data.data[0])
      }
    )
  })
}

export const getTypeInfo = () => {
  return api('getTypeInfo')
}
export const getListById = (id) => {
  return new Promise((resolve)=>{
    api('getListById/'+ id).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })
}