/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.culturatech.culturatechev03.controller;

import com.culturatech.culturatechev03.model.Usuario;
import com.culturatech.culturatechev03.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.culturatech.culturatechev03.util.PasswordUtil;
import jakarta.servlet.http.HttpSession;

import java.util.Map;

/**
 * Controlador para gestionar la autenticaciÃ³n de usuarios.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;

    public AuthController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Valida las credenciales recibidas desde el formulario de login.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> datos, HttpSession session) {    

        String correo = datos.get("correo");
        String contrasena = datos.get("contrasena");

        Usuario usuario = usuarioRepository.findByCorreo(correo);

        if (usuario == null || !PasswordUtil.verificar(contrasena, usuario.getContrasena())) {
            return ResponseEntity.status(401)
                    .body(Map.of("ok", false, "mensaje", "Credenciales incorrectas."));
        }
        
        // Guarda en sesiÃ³n el identificador del usuario autenticado.
        session.setAttribute("usuarioId", usuario.getIdUsuario());

        return ResponseEntity.ok(Map.of("ok", true, "usuario", usuario));
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();

        return ResponseEntity.ok(
                Map.of(
                        "ok", true,
                        "mensaje", "SesiÃ³n cerrada correctamente."
                )
        );
    }
    
    // Consulta los datos del usuario autenticado para mostrar su perfil.
    @GetMapping("/perfil")
    public ResponseEntity<?> perfil(HttpSession session) {
    
        // Obtiene de la sesiÃ³n el identificador del usuario autenticado.
        Integer usuarioId = (Integer) session.getAttribute("usuarioId");

        // Si no existe una sesiÃ³n de usuario, se informa que no estÃ¡ autenticado.
        if (usuarioId == null) {
            return ResponseEntity.status(401).build();
        }

        // Consulta en la base de datos el usuario correspondiente a la sesiÃ³n.
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);

        // Si el usuario no existe, devuelve una respuesta de recurso no encontrado.
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        // Devuelve los datos del usuario en formato JSON.
        return ResponseEntity.ok(usuario);
    }
    
    /**
     * Actualiza la contraseÃ±a del usuario autenticado desde su perfil.
     *
     * @param datos datos de contraseÃ±a enviados desde el formulario.
     * @param session sesiÃ³n del usuario autenticado.
     * @return resultado de la actualizaciÃ³n.
     */
    @PutMapping("/perfil")
    public ResponseEntity<?> actualizarPerfil(
            @RequestBody Map<String, String> datos,
            HttpSession session) {

        // Obtiene el identificador del usuario autenticado.
        Integer usuarioId
                = (Integer) session.getAttribute("usuarioId");

        // Verifica que exista una sesiÃ³n autenticada.
        if (usuarioId == null) {
            return ResponseEntity.status(401)
                    .body(Map.of(
                            "ok", false,
                            "mensaje", "SesiÃ³n no autenticada."
                    ));
        }

        // Obtiene las contraseÃ±as enviadas desde el modal.
        String contrasenaActual
                = datos.get("contrasenaActual");

        String nuevaContrasena
                = datos.get("nuevaContrasena");

        String confirmarContrasena
                = datos.get("confirmarContrasena");

        // Verifica que los tres campos sean obligatorios.
        if (contrasenaActual == null
                || nuevaContrasena == null
                || confirmarContrasena == null
                || contrasenaActual.isBlank()
                || nuevaContrasena.isBlank()
                || confirmarContrasena.isBlank()) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "ok", false,
                            "mensaje",
                            "Todos los campos de contraseÃ±a son obligatorios."
                    ));
        }

        // Busca el usuario autenticado en la base de datos.
        Usuario usuario
                = usuarioRepository.findById(usuarioId)
                        .orElse(null);

        // Verifica que el usuario exista.
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        // Comprueba que la contraseÃ±a actual sea correcta.
        if (!PasswordUtil.verificar(
                contrasenaActual,
                usuario.getContrasena())) {

            return ResponseEntity.status(400)
                    .body(Map.of(
                            "ok", false,
                            "mensaje",
                            "La contraseÃ±a actual es incorrecta."
                    ));
        }

        // Comprueba que la nueva contraseÃ±a y su confirmaciÃ³n coincidan.
        if (!nuevaContrasena.equals(confirmarContrasena)) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "ok", false,
                            "mensaje",
                            "La nueva contraseÃ±a y su confirmaciÃ³n no coinciden."
                    ));
        }

        // Genera el hash de la nueva contraseÃ±a.
        usuario.setContrasena(
                PasswordUtil.generarHash(nuevaContrasena)
        );

        // Guarda la nueva contraseÃ±a en la base de datos.
        usuarioRepository.save(usuario);

        // Confirma que la actualizaciÃ³n fue exitosa.
        return ResponseEntity.ok(
                Map.of(
                        "ok", true,
                        "mensaje",
                        "La contraseÃ±a fue actualizada correctamente."
                )
        );
    }
    
    /**
     * Actualiza los datos personales del usuario autenticado.
     *
     * @param datos datos personales enviados desde el formulario.
     * @param session sesiÃ³n del usuario autenticado.
     * @return resultado de la actualizaciÃ³n.
     */
    @PutMapping("/perfil/datos")
    public ResponseEntity<?> actualizarDatosPerfil(
            @RequestBody Map<String, String> datos,
            HttpSession session) {

        // Obtiene el identificador del usuario autenticado.
        Integer usuarioId
                = (Integer) session.getAttribute("usuarioId");

        // Verifica que exista una sesiÃ³n autenticada.
        if (usuarioId == null) {
            return ResponseEntity.status(401)
                    .body(Map.of(
                            "ok", false,
                            "mensaje", "SesiÃ³n no vÃ¡lida."
                    ));
        }

        // Busca el usuario en la base de datos.
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElse(null);

        // Verifica que el usuario exista.
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualiza los datos personales recibidos.
        usuario.setNombres(datos.get("nombres"));
        usuario.setApellidos(datos.get("apellidos"));
        usuario.setDocumento(datos.get("documento"));
        usuario.setFechaNacimiento(
                datos.get("fechaNacimiento") == null
                || datos.get("fechaNacimiento").isBlank()
                ? null
                : java.time.LocalDate.parse(
                        datos.get("fechaNacimiento")
                )
        );
        usuario.setCorreo(datos.get("correo"));

        // Guarda los cambios en la base de datos.
        usuarioRepository.save(usuario);

        // Confirma que la actualizaciÃ³n fue correcta.
        return ResponseEntity.ok(
                Map.of(
                        "ok", true,
                        "mensaje",
                        "Datos del perfil actualizados correctamente."
                )
        );
    }
    
    /**
     * Elimina la cuenta del usuario autenticado.
     *
     * @param session sesiÃ³n del usuario autenticado.
     * @return redirecciÃ³n hacia la pÃ¡gina de inicio de sesiÃ³n.
     */
    @PostMapping("/perfil/eliminar")
    public ResponseEntity<Void> eliminarCuenta(
            HttpSession session) {

        // Obtiene el identificador del usuario autenticado.
        Integer usuarioId
                = (Integer) session.getAttribute("usuarioId");

        // Verifica que exista una sesiÃ³n vÃ¡lida.
        if (usuarioId == null) {
            return ResponseEntity.status(401).build();
        }

        // Verifica que el usuario exista.
        if (!usuarioRepository.existsById(usuarioId)) {
            return ResponseEntity.notFound().build();
        }

        // Elimina el usuario de la base de datos.
        usuarioRepository.deleteById(usuarioId);

        // Cierra la sesiÃ³n despuÃ©s de eliminar la cuenta.
        session.invalidate();

        // Redirige al usuario hacia el inicio de sesiÃ³n.
        return ResponseEntity.status(302)
                .header("Location", "/pages/login.html")
                .build();
    }
}
