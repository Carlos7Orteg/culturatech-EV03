/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
*/
package com.culturatech.culturatechev03.controller;

// Clases y anotaciones utilizadas para implementar el controlador REST.
import com.culturatech.culturatechev03.model.Lugar;
import com.culturatech.culturatechev03.model.Rol;
import com.culturatech.culturatechev03.model.Usuario;
import com.culturatech.culturatechev03.repository.LugarRepository;
import com.culturatech.culturatechev03.repository.UsuarioRepository;
import jakarta.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador REST para gestionar los lugares de los eventos.
 * Permite realizar las operaciones CRUD mediante Spring Boot.
 */
@RestController
@RequestMapping("/api/lugares")
public class LugarController {

    // Repositorios para gestionar lugares y verificar permisos.
    private final LugarRepository lugarRepository;
    private final UsuarioRepository usuarioRepository;

    /**
     * Constructor que recibe el repositorio mediante inyecciÃ³n de dependencias.
     *
     * @param lugarRepository repositorio de lugares.
     */
    public LugarController(
            LugarRepository lugarRepository,
            UsuarioRepository usuarioRepository) {
        this.lugarRepository = lugarRepository;
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Consulta todos los lugares registrados.
     *
     * @return lista de lugares.
     */
    @GetMapping
    public List<Lugar> listar() {
        return lugarRepository.findAll();
    }

    /**
     * Consulta un lugar mediante su identificador.
     *
     * @param id identificador del lugar.
     * @return lugar encontrado.
     */
    @GetMapping("/{id}")
    public Lugar buscar(@PathVariable Integer id) {
        return lugarRepository.findById(id).orElse(null);
    }

    /**
     * Registra un nuevo lugar. Requiere permisos de administrador.
     *
     * @param lugar datos del lugar.
     * @return lugar registrado.
     */
     @PostMapping
    public ResponseEntity<?> crear(@RequestBody Lugar lugar, HttpSession session) {

        // Comprueba que el usuario tenga permisos de administrador.
        ResponseEntity<?> error = validarAdministrador(session);

        if (error != null) {
            return error;
        }

        // Normaliza los datos principales del lugar antes de comparar.
        String nombre = normalizarTexto(lugar.getNombreLugar());
        String direccion = normalizarTexto(lugar.getDireccion());

        // Consulta los lugares existentes para comprobar posibles duplicados.
        List<Lugar> lugares = lugarRepository.findAll();

        for (Lugar existente : lugares) {

            // Compara nombre, localidad y direcciÃ³n normalizados.
            if (normalizarTexto(existente.getNombreLugar()).equals(nombre)
                    && normalizarTexto(existente.getDireccion()).equals(direccion)) {

                // Rechaza el registro si ya existe un lugar equivalente.
                return ResponseEntity.badRequest()
                        .body("Ya existe un lugar registrado con el mismo nombre y direcciÃ³n.");
            }
        }

        // Guarda el lugar cuando no se encuentra un duplicado.
        return ResponseEntity.ok(lugarRepository.save(lugar));
    }
    
    // Normaliza un texto para facilitar la comparaciÃ³n de direcciones.
    private String normalizarTexto(String texto) {

        if (texto == null) {
            return "";
        }

        return texto
                .toLowerCase()
                .replace("bogotÃ¡", "")
                .replace("bogota", "")
                .replace("colombia", "")
                .replace("no.", "")
                .replace("no", "")
                .replaceAll("[^a-z0-9]", "");
    }

    /**
     * Actualiza un lugar existente.
     * Requiere permisos de administrador.
     * @param id identificador del lugar.
     * @param lugar datos actualizados.
     * @return lugar actualizado.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(
            @PathVariable Integer id,
            @RequestBody Lugar lugar,
            HttpSession session) {

        // Comprueba que el usuario tenga permisos de administrador.
        ResponseEntity<?> error = validarAdministrador(session);

        if (error != null) {
            return error;
        }

        // Normaliza el nombre y la direcciÃ³n para comprobar duplicados.
        String nombre = normalizarTexto(lugar.getNombreLugar());
        String direccion = normalizarTexto(lugar.getDireccion());

        // Consulta los lugares existentes.
        List<Lugar> lugares = lugarRepository.findAll();

        for (Lugar existente : lugares) {

            // Ignora el mismo registro que se estÃ¡ actualizando.
            if (existente.getIdLugar().equals(id)) {
                continue;
            }

            // Rechaza la actualizaciÃ³n si coincide nombre y direcciÃ³n.
            if (normalizarTexto(existente.getNombreLugar()).equals(nombre)
                    && normalizarTexto(existente.getDireccion()).equals(direccion)) {

                return ResponseEntity.badRequest()
                        .body("Ya existe un lugar registrado con el mismo nombre y direcciÃ³n.");
            }
        }

        // Asigna el identificador recibido en la URL.
        lugar.setIdLugar(id);

        // Guarda los datos actualizados.
        return ResponseEntity.ok(lugarRepository.save(lugar));
    }
    
     /**
     * Elimina un lugar existente mediante su identificador.
     * Requiere permisos de administrador.
     * @param id identificador del lugar que se desea eliminar.
     * @return respuesta de la operaciÃ³n de eliminaciÃ³n.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(
            @PathVariable Integer id,
            HttpSession session) {

        // Comprueba que el usuario tenga permisos de administrador.
        ResponseEntity<?> error = validarAdministrador(session);

        if (error != null) {
            return error;
        }

        // Verifica que el lugar exista antes de eliminarlo.
        if (!lugarRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Elimina el lugar utilizando su identificador.
        lugarRepository.deleteById(id);

        return ResponseEntity.ok(
                "Lugar eliminado correctamente."
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

