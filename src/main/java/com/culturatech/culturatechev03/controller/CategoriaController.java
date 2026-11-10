/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.culturatech.culturatechev03.controller;

import com.culturatech.culturatechev03.model.Categoria;
import com.culturatech.culturatechev03.model.Rol;
import com.culturatech.culturatechev03.model.Usuario;
import com.culturatech.culturatechev03.repository.CategoriaRepository;
import com.culturatech.culturatechev03.repository.UsuarioRepository;
import jakarta.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    // Repositorios para gestionar categorÃ­as y verificar permisos.
    private final CategoriaRepository categoriaRepository;
    private final UsuarioRepository usuarioRepository;

    // Constructor con inyecciÃ³n de dependencias.
    public CategoriaController(
            CategoriaRepository categoriaRepository,
            UsuarioRepository usuarioRepository) {
        this.categoriaRepository = categoriaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    // Consulta todas las categorÃ­as registradas. Acceso pÃºblico.
    @GetMapping
    public List<Categoria> listar() {
        return categoriaRepository.findAll();
    }

    // Consulta una categorÃ­a mediante su identificador. Acceso pÃºblico.
    @GetMapping("/{id}")
    public Categoria buscar(@PathVariable Integer id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    // Registra una nueva categorÃ­a. Requiere permisos de administrador.
    @PostMapping
    public ResponseEntity<?> crear(
            @RequestBody Categoria categoria,
            HttpSession session) {

        ResponseEntity<?> error = validarAdministrador(session);

        if (error != null) {
            return error;
        }

        return ResponseEntity.ok(categoriaRepository.save(categoria));
    }

    // Actualiza una categorÃ­a existente. Requiere permisos de administrador.
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(
            @PathVariable Integer id,
            @RequestBody Categoria categoria,
            HttpSession session) {

        ResponseEntity<?> error = validarAdministrador(session);

        if (error != null) {
            return error;
        }

        // Comprueba que la categorÃ­a exista antes de actualizarla.
        if (!categoriaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Asigna el identificador recibido en la URL.
        categoria.setIdCategoria(id);

        return ResponseEntity.ok(categoriaRepository.save(categoria));
    }

    // Elimina una categorÃ­a. Requiere permisos de administrador.
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(
            @PathVariable Integer id,
            HttpSession session) {

        ResponseEntity<?> error = validarAdministrador(session);

        if (error != null) {
            return error;
        }

        // Comprueba que la categorÃ­a exista antes de eliminarla.
        if (!categoriaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        categoriaRepository.deleteById(id);

        return ResponseEntity.ok(
                "CategorÃ­a eliminada correctamente."
        );
    }

    // Verifica que exista una sesiÃ³n vÃ¡lida y que el usuario tenga rol ADMIN.
    private ResponseEntity<?> validarAdministrador(HttpSession session) {

        // Obtiene el identificador del usuario autenticado.
        Integer usuarioId = (Integer) session.getAttribute("usuarioId");

        // Devuelve HTTP 401 si no existe una sesiÃ³n vÃ¡lida.
        if (usuarioId == null) {
            return ResponseEntity.status(401).body(
                    Map.of("ok", false, "mensaje", "SesiÃ³n no vÃ¡lida.")
            );
        }

        // Consulta el usuario directamente en la base de datos.
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);

        // Devuelve HTTP 403 si no existe o no tiene rol ADMIN.
        if (usuario == null || usuario.getRol() != Rol.ADMIN) {
            return ResponseEntity.status(403).body(
                    Map.of("ok", false, "mensaje", "Acceso denegado.")
            );
        }

        // La validaciÃ³n fue satisfactoria.
        return null;
    }
}
