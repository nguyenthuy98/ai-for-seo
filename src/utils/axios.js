import Vue from 'vue';
import axios from 'axios';
import store from '../store';

const instance = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 300000, // request timeout
});

instance.interceptors.response.use(
  (res) => {
    if (store.getters.sessionExpired) {
      store.dispatch('updateSessionExpired', false);
    }
    return res.data;
  },
  (err) => {
    console.log(err);
    let message = err?.response?.data?.message
      || err?.response?.data?.detail?.message
      || err?.response?.data?.detail
      || 'Đã xảy ra lỗi';

    if (err.code === 'ECONNABORTED') message = 'Không nhận được phản hồi từ server';

    Vue.notify({
      type: 'error',
      title: 'Error',
      text: message,
    });

    if (store.getters.sessionExpired) {
      store.dispatch('updateSessionExpired', false);
    }

    console.log(err);
    return Promise.reject(err);
  },
);

export default instance;
