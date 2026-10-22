/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

import apiClient from './apiClient';

export const authService = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  getPerfil: () => apiClient.get('/auth/perfil'),
  actualizarDatos: (datos) => apiClient.put('/auth/perfil/datos', datos),
  cambiarContrasena: (passwords) => apiClient.put('/auth/perfil', passwords),
  eliminarCuenta: () => apiClient.post('/auth/perfil/eliminar')
};


