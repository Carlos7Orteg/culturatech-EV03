/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

import apiClient from './apiClient';

export const usersService = {
  getAll: () => apiClient.get('/usuarios'),
  getById: (id) => apiClient.get(`/usuarios/${id}`),
  create: (usuario) => apiClient.post('/usuarios', usuario),
  update: (id, payload) => apiClient.put(`/usuarios/${id}`, payload),
  delete: (id) => apiClient.delete(`/usuarios/${id}`)
};


