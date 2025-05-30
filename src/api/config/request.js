import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const requests = axios.create({
  baseURL: "/api",
  timeout: 5000,
});
// 添加请求拦截器
requests.interceptors.request.use(
  (config) => {
    // nprogress.start();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
requests.interceptors.response.use(
  (response) => {
    // nprogress.done();
    if (response.data.code === 200) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default requests;
