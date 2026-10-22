/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */
import apiClient from './apiClient';

export const categoriesService = {
  getAll: () => apiClient.get('/categorias'),
  getById: (id) => apiClient.get(`/categorias/${id}`),
  create: (categoria) => apiClient.post('/categorias', categoria),
  update: (id, categoria) => apiClient.put(`/categorias/${id}`, categoria),
  delete: (id) => apiClient.delete(`/categorias/${id}`)
};

