/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.culturatech.culturatechev03.repository;

import com.culturatech.culturatechev03.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repositorio para gestionar los datos de la entidad Usuario.
 * Spring Data JPA proporciona las operaciones de consulta y persistencia.
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    // Busca un usuario por su correo electrÃ³nico para validar el acceso al sistema.
    Usuario findByCorreo(String correo);
}
