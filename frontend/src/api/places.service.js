/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

import apiClient from './apiClient';

export const placesService = {
  getAll: () => apiClient.get('/lugares'),
  getById: (id) => apiClient.get(`/lugares/${id}`),
  create: (lugar) => apiClient.post('/lugares', lugar),
  update: (id, lugar) => apiClient.put(`/lugares/${id}`, lugar),
  delete: (id) => apiClient.delete(`/lugares/${id}`)
};


