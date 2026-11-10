/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.culturatech.culturatechev03.controller;

// Clases y anotaciones utilizadas para implementar el controlador REST.
import com.culturatech.culturatechev03.model.Usuario;
import com.culturatech.culturatechev03.repository.UsuarioRepository;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.culturatech.culturatechev03.model.Rol;
import com.culturatech.culturatechev03.util.PasswordUtil;
import jakarta.servlet.http.HttpSession;
import java.util.Map;
import org.springframework.http.ResponseEntity;

/**
 * Controlador REST para gestionar los usuarios del sistema.
 * Permite realizar las operaciones CRUD mediante Spring Boot.
 */
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    // Repositorio utilizado para acceder a los datos de los usuarios.
    private final UsuarioRepository usuarioRepository;

    /**
     * Constructor que recibe el repositorio mediante inyecciÃ³n de dependencias.
     *
     * @param usuarioRepository repositorio de usuarios.
     */
    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Consulta todos los usuarios registrados.
     *
     * @return lista de usuarios.
     */
    // Esta operaciÃ³n estÃ¡ reservada para administradores.
    @GetMapping
    public ResponseEntity<?> listar(HttpSession session) {
        
        // Comprueba que exista una sesiÃ³n vÃ¡lida y que el usuario sea ADMIN.
        ResponseEntity<?> error = validarAdministrador(session);
        // Si la validaciÃ³n falla, devuelve el error correspondiente.
        if (error != null) return error;
        
        // Consulta todos los usuarios almacenados en la base de datos.
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    /**
     * Consulta un usuario mediante su identificador.
     *
     * @param id identificador del usuario.
     * @return usuario encontrado.
     */
    // Solo los administradores pueden consultar estos datos.
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Integer id, HttpSession session) {
        
        // Verifica los permisos del usuario que realiza la solicitud.
        ResponseEntity<?> error = validarAdministrador(session);
        // Detiene la operaciÃ³n si no tiene autorizaciÃ³n.
        if (error != null) return error;

        // Busca el usuario por su ID.
        Usuario usuario = usuarioRepository.findById(id).orElse(null);

        // Devuelve un error 404 si el usuario no existe.
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
 
        // Devuelve los datos del usuario encontrado.
        return ResponseEntity.ok(usuario);
    }
    
    /**
     * Registra un nuevo usuario.
     *
     * @param usuario usuario que se desea registrar.
     * @return usuario registrado con la contraseÃ±a protegida.
     */
    @PostMapping
    public Usuario crear(@RequestBody Usuario usuario) {
        // Todo registro pÃºblico comienza con rol USER.
        usuario.setRol(Rol.USER);

        // Genera el hash de la contraseÃ±a antes de almacenarla en la base de datos.
        usuario.setContrasena(
                PasswordUtil.generarHash(usuario.getContrasena()
                )
        );

        // Guarda el usuario con la contraseÃ±a protegida.
        return usuarioRepository.save(usuario);
    }

    /**
     * Actualiza los datos de un usuario existente y aplica las validaciones de
     * seguridad segÃºn el usuario que realiza la operaciÃ³n.
     *
     * @param id identificador del usuario que se desea actualizar.
     * @param solicitud datos del usuario y credenciales de seguridad.
     * @param session sesiÃ³n del usuario autenticado.
     * @return respuesta con el resultado de la actualizaciÃ³n.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(
            @PathVariable Integer id,
            @RequestBody UsuarioActualizacionRequest solicitud,
            HttpSession session) {

        // Obtiene de la sesiÃ³n el identificador del usuario que realiza la acciÃ³n.
        Integer administradorId = (Integer) session.getAttribute("usuarioId");

        // Verifica que exista una sesiÃ³n autenticada.
        if (administradorId == null) {
            return ResponseEntity.status(401)
                    .body(Map.of(
                            "ok", false,
                            "mensaje", "SesiÃ³n no vÃ¡lida."
                    ));
        }

        // Consulta el usuario que realiza la operaciÃ³n.
        Usuario administrador = usuarioRepository.findById(administradorId)
                .orElse(null);

        // Verifica que el usuario autenticado tenga rol ADMIN.
        if (administrador == null || administrador.getRol() != Rol.ADMIN) {
            return ResponseEntity.status(403)
                    .body(Map.of(
                            "ok", false,
                            "mensaje", "No tiene permisos para realizar esta operaciÃ³n."
                    ));
        }

        // Consulta el usuario que serÃ¡ modificado.
        Usuario existente = usuarioRepository.findById(id)
                .orElse(null);

        if (existente == null) {
            return ResponseEntity.status(404)
                    .body(Map.of(
                            "ok", false,
                            "mensaje", "Usuario no encontrado."
                    ));
        }

        // Determina si el administrador estÃ¡ modificando su propio usuario.
        boolean esPropioUsuario = administradorId.equals(id);

        /*
     * Cuando un ADMIN modifica a otro ADMIN se solicita la contraseÃ±a
     * del administrador que estÃ¡ realizando la operaciÃ³n.
         */
        if (!esPropioUsuario && existente.getRol() == Rol.ADMIN) {

            if (solicitud.getContrasenaSeguridad() == null
                    || solicitud.getContrasenaSeguridad().isBlank()) {
                return ResponseEntity.badRequest()
                        .body(Map.of(
                                "ok", false,
                                "mensaje", "Debe proporcionar la contraseÃ±a de seguridad."
                        ));
            }

            // Verifica la contraseÃ±a actual del administrador que realiza la acciÃ³n.
            if (!PasswordUtil.verificar(
                    solicitud.getContrasenaSeguridad(),
                    administrador.getContrasena())) {

                return ResponseEntity.status(403)
                        .body(Map.of(
                                "ok", false,
                                "mensaje", "La contraseÃ±a de seguridad es incorrecta."
                        ));
            }
        }

        /*
     * Si el administrador estÃ¡ modificando su propia contraseÃ±a,
     * se exige contraseÃ±a actual, nueva contraseÃ±a y confirmaciÃ³n.
         */
        if (esPropioUsuario) {

            boolean solicitaCambioContrasena
                    = (solicitud.getContrasenaActual() != null
                    && !solicitud.getContrasenaActual().isBlank())
                    || (solicitud.getNuevaContrasena() != null
                    && !solicitud.getNuevaContrasena().isBlank())
                    || (solicitud.getConfirmarContrasena() != null
                    && !solicitud.getConfirmarContrasena().isBlank());

            if (solicitaCambioContrasena) {

                if (solicitud.getContrasenaActual() == null
                        || solicitud.getContrasenaActual().isBlank()
                        || solicitud.getNuevaContrasena() == null
                        || solicitud.getNuevaContrasena().isBlank()
                        || solicitud.getConfirmarContrasena() == null
                        || solicitud.getConfirmarContrasena().isBlank()) {

                    return ResponseEntity.badRequest()
                            .body(Map.of(
                                    "ok", false,
                                    "mensaje", "Debe proporcionar la contraseÃ±a actual, la nueva contraseÃ±a y su confirmaciÃ³n."
                            ));
                }

                // Verifica la contraseÃ±a actual del administrador.
                if (!PasswordUtil.verificar(
                        solicitud.getContrasenaActual(),
                        existente.getContrasena())) {

                    return ResponseEntity.status(403)
                            .body(Map.of(
                                    "ok", false,
                                    "mensaje", "La contraseÃ±a actual es incorrecta."
                            ));
                }

                // Verifica que la nueva contraseÃ±a y su confirmaciÃ³n coincidan.
                if (!solicitud.getNuevaContrasena()
                        .equals(solicitud.getConfirmarContrasena())) {

                    return ResponseEntity.badRequest()
                            .body(Map.of(
                                    "ok", false,
                                    "mensaje", "La nueva contraseÃ±a y su confirmaciÃ³n no coinciden."
                            ));
                }

                // Genera el nuevo hash antes de almacenarlo.
                existente.setContrasena(
                        PasswordUtil.generarHash(
                                solicitud.getNuevaContrasena()
                        )
                );
            }
        }

        // Actualiza los datos generales del usuario.
        existente.setNombres(solicitud.getUsuario().getNombres());
        existente.setApellidos(solicitud.getUsuario().getApellidos());
        existente.setDocumento(solicitud.getUsuario().getDocumento());
        existente.setFechaNacimiento(
                solicitud.getUsuario().getFechaNacimiento()
        );
        existente.setCorreo(solicitud.getUsuario().getCorreo());
        existente.setRol(solicitud.getUsuario().getRol());

        /*
     * Para otro usuario, una contraseÃ±a nueva solo se actualiza
     * cuando el formulario la proporciona.
         */
        if (!esPropioUsuario
                && solicitud.getUsuario().getContrasena() != null
                && !solicitud.getUsuario().getContrasena().isBlank()) {

            existente.setContrasena(
                    PasswordUtil.generarHash(
                            solicitud.getUsuario().getContrasena()
                    )
            );
        }

        return ResponseEntity.ok(usuarioRepository.save(existente));
    }
    
    /**
     * Estructura utilizada para recibir los datos del usuario junto con las
     * credenciales necesarias para las operaciones de seguridad.
     */
    public static class UsuarioActualizacionRequest {

        private Usuario usuario;
        private String contrasenaSeguridad;
        private String contrasenaActual;
        private String nuevaContrasena;
        private String confirmarContrasena;

        public Usuario getUsuario() {
            return usuario;
        }

        public void setUsuario(Usuario usuario) {
            this.usuario = usuario;
        }

        public String getContrasenaSeguridad() {
            return contrasenaSeguridad;
        }

        public void setContrasenaSeguridad(String contrasenaSeguridad) {
            this.contrasenaSeguridad = contrasenaSeguridad;
        }

        public String getContrasenaActual() {
            return contrasenaActual;
        }

        public void setContrasenaActual(String contrasenaActual) {
            this.contrasenaActual = contrasenaActual;
        }

        public String getNuevaContrasena() {
            return nuevaContrasena;
        }

        public void setNuevaContrasena(String nuevaContrasena) {
            this.nuevaContrasena = nuevaContrasena;
        }

        public String getConfirmarContrasena() {
            return confirmarContrasena;
        }

        public void setConfirmarContrasena(String confirmarContrasena) {
            this.confirmarContrasena = confirmarContrasena;
        }
    }
    
     /**
     * Elimina un usuario existente mediante su identificador.
     *
     * @param id identificador del usuario que se desea eliminar.
     * @return respuesta de la operaciÃ³n de eliminaciÃ³n.
     */
    // Esta operaciÃ³n requiere permisos de administrador.
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Integer id, HttpSession session) {
        
        // Comprueba que el usuario tenga una sesiÃ³n vÃ¡lida y rol ADMIN.
        ResponseEntity<?> error = validarAdministrador(session);
        // Impide continuar si no cuenta con los permisos necesarios.
        if (error != null) return error;
        
        // Verifica que el usuario exista antes de intentar eliminarlo.
        if (!usuarioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        
        // Elimina el usuario utilizando su identificador.
        usuarioRepository.deleteById(id);
        
        // Confirma que la eliminaciÃ³n se realizÃ³ correctamente.
        return ResponseEntity.ok(
                "Usuario eliminado correctamente."
        );
    }
    
    // Comprueba que exista una sesiÃ³n vÃ¡lida y que el usuario tenga rol ADMIN.
    // Se utiliza para proteger las operaciones administrativas.
    private ResponseEntity<?> validarAdministrador(HttpSession session) {
        // Obtiene el identificador del usuario almacenado en la sesiÃ³n.
        Integer usuarioId = (Integer) session.getAttribute("usuarioId");
        
        // Si no existe una sesiÃ³n, devuelve HTTP 401 (No autorizado).
        if (usuarioId == null) {
            return ResponseEntity.status(401).body(
                Map.of("ok", false, "mensaje", "SesiÃ³n no vÃ¡lida.")
            );
        } 
        
        // Consulta en la base de datos al usuario autenticado.
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
        
        // Comprueba que el usuario exista y tenga el rol ADMIN.
        // Si no cumple ambas condiciones, devuelve HTTP 403 (Acceso denegado).
        if (usuario == null || usuario.getRol() != Rol.ADMIN) {
            return ResponseEntity.status(403).body(
                Map.of("ok", false, "mensaje", "Acceso denegado.")
            );
        }
        
        // Devuelve null cuando la validaciÃ³n es satisfactoria.
        return null;
    }
}

