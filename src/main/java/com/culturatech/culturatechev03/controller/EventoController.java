/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.culturatech.culturatechev03.controller;

import com.culturatech.culturatechev03.model.Evento;
import com.culturatech.culturatechev03.model.Rol;
import com.culturatech.culturatechev03.model.Usuario;
import com.culturatech.culturatechev03.repository.EventoRepository;
import com.culturatech.culturatechev03.repository.UsuarioRepository;
import jakarta.servlet.http.HttpSession;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    // Repositorios utilizados para gestionar eventos y verificar permisos.
    private final EventoRepository eventoRepository;
    private final UsuarioRepository usuarioRepository;

    // InyecciÃ³n de dependencias.
    public EventoController(
            EventoRepository eventoRepository,
            UsuarioRepository usuarioRepository) {
        this.eventoRepository = eventoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    // Consulta todos los eventos. Esta operaciÃ³n permanece pÃºblica.
    @GetMapping
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(eventoRepository.findAll());
    }

    // Consulta un evento por su identificador.
    @GetMapping("/{id}")
    public ResponseEntity<?> buscar(@PathVariable Integer id) {
        return eventoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Registra un evento. Requiere permisos de administrador.
    @PostMapping
    public ResponseEntity<?> crear(
            @RequestBody Evento evento,
            HttpSession session) {

        ResponseEntity<?> error = validarAdministrador(session);

        if (error != null) {
            return error;
        }

        return ResponseEntity.ok(eventoRepository.save(evento));
    }

    // Actualiza un evento existente. Requiere permisos de administrador.
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(
            @PathVariable Integer id,
            @RequestBody Evento evento,
            HttpSession session) {

        ResponseEntity<?> error = validarAdministrador(session);

        if (error != null) {
            return error;
        }

        // Comprueba que el evento exista antes de actualizarlo.
        if (!eventoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        evento.setIdEvento(id);

        return ResponseEntity.ok(eventoRepository.save(evento));
    }

    // Elimina un evento. Requiere permisos de administrador.
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(
            @PathVariable Integer id,
            HttpSession session) {

        ResponseEntity<?> error = validarAdministrador(session);

        if (error != null) {
            return error;
        }

        // Comprueba que el evento exista antes de eliminarlo.
        if (!eventoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        eventoRepository.deleteById(id);

        return ResponseEntity.ok(
                "Evento eliminado correctamente."
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

        // Devuelve HTTP 403 si el usuario no existe o no es administrador.
        if (usuario == null || usuario.getRol() != Rol.ADMIN) {
            return ResponseEntity.status(403).body(
                    Map.of("ok", false, "mensaje", "Acceso denegado.")
            );
        }

        // La validaciÃ³n fue satisfactoria.
        return null;
    }
}

