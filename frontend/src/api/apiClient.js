/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMsg =
      error.response?.data?.mensaje ||
      error.response?.data?.message ||
      (typeof error.response?.data === 'string' ? error.response.data : null) ||
      error.message ||
      'Error de conexión con el servidor';

    return Promise.reject(new Error(errorMsg));
  }
);

export default apiClient;


