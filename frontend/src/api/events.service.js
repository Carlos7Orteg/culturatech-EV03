/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

import apiClient from './apiClient';

export const eventsService = {
  getAll: () => apiClient.get('/eventos'),
  getById: (id) => apiClient.get(`/eventos/${id}`),
  create: (evento) => apiClient.post('/eventos', evento),
  update: (id, evento) => apiClient.put(`/eventos/${id}`, evento),
  delete: (id) => apiClient.delete(`/eventos/${id}`)
};


