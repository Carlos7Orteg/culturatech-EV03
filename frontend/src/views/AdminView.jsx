/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
/*
 * Panel administrativo de CulturaTech Bogotá.
 * Migración a React del diseño original de culturatech-ev01.
 * Conserva la estructura, las clases CSS y los flujos del administrador legado.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../api/auth.service";
import { usersService } from "../api/users.service";
import { eventsService } from "../api/events.service";
import { categoriesService } from "../api/categories.service";
import { placesService } from "../api/places.service";

const nuevoUsuario = () => ({
  nombres: "",
  apellidos: "",
  documento: "",
  fechaNacimiento: "",
  correo: "",
  contrasena: "",
  rol: "USER",
});

const nuevoEvento = () => ({
  titulo: "",
  descripcion: "",
  fechaHora: "",
  costo: "0",
  imagen: "",
  estado: "ACTIVO",
  idCategoria: "",
  idLugar: "",
});

const nuevaCategoria = () => ({ nombreCategoria: "", descripcion: "" });

const nuevoLugar = () => ({
  nombreLugar: "",
  direccion: "",
  localidad: "",
  telefono: "",
  latitud: "",
  longitud: "",
  paginaWeb: "",
});

export default function AdminView() {
  // Sección administrativa activa.
  const [seccion, setSeccion] = useState("usuarios");

  // Datos recibidos desde Spring Boot.
  const [usuarios, setUsuarios] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [lugares, setLugares] = useState([]);

  // Estados de los formularios y sus identificadores de edición.
  const [usuarioForm, setUsuarioForm] = useState(nuevoUsuario);
  const [usuarioEditId, setUsuarioEditId] = useState("");
  const [eventoForm, setEventoForm] = useState(nuevoEvento);
  const [eventoEditId, setEventoEditId] = useState("");
  const [categoriaForm, setCategoriaForm] = useState(nuevaCategoria);
  const [categoriaEditId, setCategoriaEditId] = useState("");
  const [lugarForm, setLugarForm] = useState(nuevoLugar);
  const [lugarEditId, setLugarEditId] = useState("");

  // Mensaje de resultado de las operaciones administrativas.
  const [alerta, setAlerta] = useState(null);

  // Estado del modal de confirmación de seguridad para usuarios.
  const [modalSeguridad, setModalSeguridad] = useState(null);
  const [camposSeguridad, setCamposSeguridad] = useState({
    contrasenaSeguridad: "",
    contrasenaActual: "",
    nuevaContrasena: "",
    confirmarContrasena: "",
  });
  const resolverSeguridad = useRef(null);

  const mostrarAlerta = useCallback((mensaje, tipo = "success") => {
    setAlerta({ mensaje, tipo });
  }, []);

  // Carga los usuarios registrados.
  const cargarUsuarios = useCallback(async () => {
    try {
      const data = await usersService.getAll();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (error) {
      mostrarAlerta(
        error.message || "No fue posible consultar los usuarios.",
        "error",
      );
    }
  }, [mostrarAlerta]);

  // Carga los eventos registrados.
  const cargarEventos = useCallback(async () => {
    try {
      const data = await eventsService.getAll();
      setEventos(Array.isArray(data) ? data : []);
    } catch (error) {
      mostrarAlerta(
        error.message || "No fue posible consultar los eventos.",
        "error",
      );
    }
  }, [mostrarAlerta]);

  // Carga las categorías utilizadas por Eventos y por su propio módulo.
  const cargarCategorias = useCallback(async () => {
    try {
      const data = await categoriesService.getAll();
      setCategorias(Array.isArray(data) ? data : []);
    } catch (error) {
      mostrarAlerta(
        error.message || "No fue posible consultar las categorías.",
        "error",
      );
    }
  }, [mostrarAlerta]);

  // Carga los lugares utilizados por Eventos y por su propio módulo.
  const cargarLugares = useCallback(async () => {
    try {
      const data = await placesService.getAll();
      setLugares(Array.isArray(data) ? data : []);
    } catch (error) {
      mostrarAlerta(
        error.message || "No fue posible consultar los lugares.",
        "error",
      );
    }
  }, [mostrarAlerta]);

  // Carga los cuatro módulos al entrar al panel administrativo.
  useEffect(() => {
    cargarUsuarios();
    cargarEventos();
    cargarCategorias();
    cargarLugares();
  }, [cargarUsuarios, cargarEventos, cargarCategorias, cargarLugares]);

  // Abre el modal y espera la confirmación de seguridad.
  const solicitarSeguridad = (modo) =>
    new Promise((resolve) => {
      resolverSeguridad.current = resolve;
      setCamposSeguridad({
        contrasenaSeguridad: "",
        contrasenaActual: "",
        nuevaContrasena: "",
        confirmarContrasena: "",
      });
      setModalSeguridad({
        modo,
        titulo:
          modo === "admin"
            ? "Confirmación de seguridad"
            : "Cambio de contraseña",
        mensaje:
          modo === "admin"
            ? "Para editar otro administrador, confirme su contraseña."
            : "Ingrese su contraseña actual y la nueva contraseña.",
      });
    });

  // Cierra el modal y devuelve el resultado al proceso que lo solicitó.
  const cerrarModalSeguridad = (resultado = null) => {
    setModalSeguridad(null);
    const resolver = resolverSeguridad.current;
    resolverSeguridad.current = null;
    if (resolver) resolver(resultado);
  };

  // Valida los campos del modal antes de devolver las credenciales.
  const confirmarSeguridad = (event) => {
    event.preventDefault();

    if (modalSeguridad?.modo === "admin") {
      if (!camposSeguridad.contrasenaSeguridad.trim()) {
        setModalSeguridad((actual) => ({
          ...actual,
          mensaje: "Debe ingresar la contraseña del administrador.",
        }));
        return;
      }
      cerrarModalSeguridad({
        contrasenaSeguridad: camposSeguridad.contrasenaSeguridad,
      });
      return;
    }

    if (
      !camposSeguridad.contrasenaActual.trim() ||
      !camposSeguridad.nuevaContrasena.trim() ||
      !camposSeguridad.confirmarContrasena.trim()
    ) {
      setModalSeguridad((actual) => ({
        ...actual,
        mensaje: "Debe completar los tres campos de contraseña.",
      }));
      return;
    }

    if (
      camposSeguridad.nuevaContrasena !== camposSeguridad.confirmarContrasena
    ) {
      setModalSeguridad((actual) => ({
        ...actual,
        mensaje: "La nueva contraseña y su confirmación no coinciden.",
      }));
      return;
    }

    cerrarModalSeguridad({
      contrasenaActual: camposSeguridad.contrasenaActual,
      nuevaContrasena: camposSeguridad.nuevaContrasena,
      confirmarContrasena: camposSeguridad.confirmarContrasena,
    });
  };

  // Registra o actualiza un usuario y conserva las confirmaciones de seguridad del legado.
  const guardarUsuario = async (event) => {
    event.preventDefault();
    const usuario = {
      ...usuarioForm,
      nombres: usuarioForm.nombres.trim(),
      apellidos: usuarioForm.apellidos.trim(),
      documento: usuarioForm.documento.trim(),
      correo: usuarioForm.correo.trim(),
    };

    try {
      if (!usuarioEditId) {
        // El registro ordinario crea cuentas USER; la promoción a ADMIN sigue el procedimiento SQL del proyecto.
        await usersService.create({ ...usuario, rol: "USER" });
        limpiarFormularioUsuario();
        await cargarUsuarios();
        mostrarAlerta(
          usuarioForm.rol === "ADMIN"
            ? "Usuario registrado como USER. Para asignarle ADMIN, utiliza database/crear_administrador.sql."
            : "Usuario registrado correctamente.",
          "success",
        );
        return;
      }

      // Consulta la sesión y el usuario objetivo para determinar qué validación corresponde.
      const administrador = await authService.getPerfil();
      const objetivo = await usersService.getById(usuarioEditId);
      const esPropioUsuario =
        Number(administrador.idUsuario) === Number(usuarioEditId);
      let seguridad = {};

      // Al modificar otra cuenta ADMIN se solicita la contraseña del administrador actual.
      if (!esPropioUsuario && objetivo.rol === "ADMIN") {
        const confirmacion = await solicitarSeguridad("admin");
        if (!confirmacion) return;
        seguridad = confirmacion;
      }

      // Al cambiar la propia contraseña se solicitan las credenciales actuales y la confirmación.
      if (esPropioUsuario && usuario.contrasena.trim()) {
        const confirmacion = await solicitarSeguridad("propia");
        if (!confirmacion) return;
        seguridad = confirmacion;
      }

      const payload = {
        usuario: {
          idUsuario: Number(usuarioEditId),
          ...usuario,
        },
        ...seguridad,
      };

      await usersService.update(usuarioEditId, payload);
      limpiarFormularioUsuario();
      await cargarUsuarios();
      mostrarAlerta("Usuario actualizado correctamente.", "success");
    } catch (error) {
      mostrarAlerta(
        error.message || "No fue posible guardar el usuario.",
        "error",
      );
    }
  };

  // Carga un usuario existente en el formulario.
  const editarUsuario = async (id) => {
    try {
      const usuario = await usersService.getById(id);
      setUsuarioEditId(String(usuario.idUsuario));
      setUsuarioForm({
        nombres: usuario.nombres || "",
        apellidos: usuario.apellidos || "",
        documento: usuario.documento || "",
        fechaNacimiento: usuario.fechaNacimiento || "",
        correo: usuario.correo || "",
        contrasena: "",
        rol: usuario.rol || "USER",
      });
    } catch (error) {
      mostrarAlerta(
        error.message || "No fue posible consultar el usuario.",
        "error",
      );
    }
  };

  // Elimina un usuario después de solicitar confirmación.
  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    try {
      await usersService.delete(id);
      await cargarUsuarios();
      mostrarAlerta("Usuario eliminado correctamente.", "success");
    } catch (error) {
      mostrarAlerta(
        error.message || "No fue posible eliminar el usuario.",
        "error",
      );
    }
  };

  // Devuelve el formulario de usuarios al modo de registro.
  const limpiarFormularioUsuario = () => {
    setUsuarioEditId("");
    setUsuarioForm(nuevoUsuario());
  };

  // Registra o actualiza un evento.
  const guardarEvento = async (event) => {
    event.preventDefault();
    const evento = {
      titulo: eventoForm.titulo.trim(),
      descripcion: eventoForm.descripcion.trim(),
      fechaHora: eventoForm.fechaHora,
      costo: eventoForm.costo === "" ? 0 : Number(eventoForm.costo),
      imagen: eventoForm.imagen.trim(),
      estado: eventoForm.estado,
      categoria: { idCategoria: Number(eventoForm.idCategoria) },
      lugar: { idLugar: Number(eventoForm.idLugar) },
    };

    try {
      if (eventoEditId) {
        await eventsService.update(eventoEditId, evento);
        mostrarAlerta("Evento actualizado correctamente.", "success");
      } else {
        await eventsService.create(evento);
        mostrarAlerta("Evento registrado correctamente.", "success");
      }
      limpiarFormularioEvento();
      await cargarEventos();
    } catch (error) {
      mostrarAlerta(
        error.message || "No fue posible guardar el evento.",
        "error",
      );
    }
  };

  // Carga un evento en el formulario para editarlo.
  const editarEvento = async (id) => {
    try {
      const evento = await eventsService.getById(id);
      setEventoEditId(String(evento.idEvento));
      setEventoForm({
        titulo: evento.titulo || "",
        descripcion: evento.descripcion || "",
        fechaHora: evento.fechaHora ? evento.fechaHora.substring(0, 16) : "",
        costo: evento.costo ?? "0",
        imagen: evento.imagen || "",
        estado: evento.estado || "ACTIVO",
        idCategoria: evento.categoria?.idCategoria
          ? String(evento.categoria.idCategoria)
          : "",
        idLugar: evento.lugar?.idLugar ? String(evento.lugar.idLugar) : "",
      });
      setSeccion("eventos");
    } catch (error) {
      mostrarAlerta(
        error.message || "No fue posible consultar el evento.",
        "error",
      );
    }
  };

  // Elimina un evento después de solicitar confirmación.
  const eliminarEvento = async (id) => {
    if (!window.confirm("¿Eliminar este evento?")) return;
    try {
      await eventsService.delete(id);
      await cargarEventos();
      mostrarAlerta("Evento eliminado correctamente.", "success");
    } catch (error) {
      mostrarAlerta(
        error.message || "No fue posible eliminar el evento.",
        "error",
      );
    }
  };

  // Devuelve el formulario de eventos al modo de registro.
  const limpiarFormularioEvento = () => {
    setEventoEditId("");
    setEventoForm(nuevoEvento());
  };

  // Registra o actualiza una categoría.
  const guardarCategoria = async (event) => {
    event.preventDefault();
    const categoria = {
      nombreCategoria: categoriaForm.nombreCategoria.trim(),
      descripcion: categoriaForm.descripcion.trim(),
    };

    try {
      if (categoriaEditId) {
        await categoriesService.update(categoriaEditId, categoria);
        mostrarAlerta("Categoría actualizada correctamente.", "success");
      } else {
        await categoriesService.create(categoria);
        mostrarAlerta("Categoría registrada correctamente.", "success");
      }
      limpiarFormularioCategoria();
      await cargarCategorias();
    } catch (error) {
      mostrarAlerta(
        error.message || "No fue posible guardar la categoría.",
        "error",
      );
    }
  };

  // Carga una categoría en el formulario para editarla.
  const editarCategoria = async (id) => {
    try {
      const categoria = await categoriesService.getById(id);
      setCategoriaEditId(String(categoria.idCategoria));
      setCategoriaForm({
        nombreCategoria: categoria.nombreCategoria || "",
        descripcion: categoria.descripcion || "",
      });
      setSeccion("categorias");
    } catch (error) {
      mostrarAlerta(
        error.message || "No fue posible consultar la categoría.",
        "error",
      );
    }
  };

  // Elimina una categoría después de solicitar confirmación.
  const eliminarCategoria = async (id) => {
    if (!window.confirm("¿Está seguro de que desea eliminar esta categoría?"))
      return;
    try {
      await categoriesService.delete(id);
      await cargarCategorias();
      mostrarAlerta("Categoría eliminada correctamente.", "success");
    } catch (error) {
      mostrarAlerta(
        error.message || "No fue posible eliminar la categoría.",
        "error",
      );
    }
  };

  // Devuelve el formulario de categorías al modo de registro.
  const limpiarFormularioCategoria = () => {
    setCategoriaEditId("");
    setCategoriaForm(nuevaCategoria());
  };

  // Registra o actualiza un lugar.
  const guardarLugar = async (event) => {
    event.preventDefault();
    const lugar = {
      nombreLugar: lugarForm.nombreLugar.trim(),
      direccion: lugarForm.direccion.trim(),
      localidad: lugarForm.localidad.trim(),
      telefono: lugarForm.telefono.trim(),
      latitud: lugarForm.latitud === "" ? null : Number(lugarForm.latitud),
      longitud: lugarForm.longitud === "" ? null : Number(lugarForm.longitud),
      paginaWeb: lugarForm.paginaWeb.trim(),
    };

    try {
      if (lugarEditId) {
        await placesService.update(lugarEditId, lugar);
        mostrarAlerta("Lugar actualizado correctamente.", "success");
      } else {
        await placesService.create(lugar);
        mostrarAlerta("Lugar registrado correctamente.", "success");
      }
      limpiarFormularioLugar();
      await cargarLugares();
    } catch (error) {
      mostrarAlerta(
        error.message || "No fue posible guardar el lugar.",
        "error",
      );
    }
  };

  // Carga un lugar en el formulario para editarlo.
  const editarLugar = async (id) => {
    try {
      const lugar = await placesService.getById(id);
      setLugarEditId(String(lugar.idLugar));
      setLugarForm({
        nombreLugar: lugar.nombreLugar || "",
        direccion: lugar.direccion || "",
        localidad: lugar.localidad || "",
        telefono: lugar.telefono || "",
        latitud: lugar.latitud ?? "",
        longitud: lugar.longitud ?? "",
        paginaWeb: lugar.paginaWeb || "",
      });
      setSeccion("lugares");
    } catch (error) {
      mostrarAlerta(
        error.message || "No fue posible consultar el lugar.",
        "error",
      );
    }
  };

  // Elimina un lugar después de solicitar confirmación.
  const eliminarLugar = async (id) => {
    if (!window.confirm("¿Está seguro de que desea eliminar este lugar?"))
      return;
    try {
      await placesService.delete(id);
      await cargarLugares();
      mostrarAlerta("Lugar eliminado correctamente.", "success");
    } catch (error) {
      mostrarAlerta(
        error.message || "No fue posible eliminar el lugar.",
        "error",
      );
    }
  };

  // Devuelve el formulario de lugares al modo de registro.
  const limpiarFormularioLugar = () => {
    setLugarEditId("");
    setLugarForm(nuevoLugar());
  };

  return (
    <div className="admin-page">
      <div className="admin-shell">
        {/* Enlace para regresar a la aplicación principal. */}
        <div className="admin-back">
          <Link to="/">
            <span className="material-symbols-outlined">arrow_back</span>
            Volver al proyecto
          </Link>
        </div>

        {/* Hoja principal del panel, conservada del diseño original. */}
        <main className="admin-sheet">
          <header className="admin-top">
            <div className="admin-brand">
              <div className="admin-brand-logo">
                <img src="/assets/images/logo_CulturaTechBG.png" alt="CulturaTech Bogotá"/>
              </div>
              <div>
                <span className="admin-eyebrow">GESTIÓN DEL SISTEMA</span>
                <h1>Panel administrativo</h1>
                <p>Administra usuarios y eventos desde un único espacio.</p>
              </div>
            </div>
          </header>

          <section className="admin-content">
            {alerta && (
              <div className={`admin-alert ${alerta.tipo === "success" ? "admin-alert-success" : "admin-alert-error"}`} role="alert">
                <span className="material-symbols-outlined">
                  {alerta.tipo === "success" ? "check_circle" : "error"}
                </span>
                <span>{alerta.mensaje}</span>
              </div>
            )}

            {/* Navegación entre las cuatro secciones del administrador. */}
            <nav className="admin-nav" aria-label="Secciones administrativas">
              <a href="#usuarios" className={seccion === "usuarios" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setSeccion("usuarios");
                }}
              >
                <span className="material-symbols-outlined">group</span>Usuarios
              </a>
              <a href="#eventos" className={seccion === "eventos" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setSeccion("eventos");
                }}>
                <span className="material-symbols-outlined">event</span>Eventos
              </a>
              <a href="#categorias" className={seccion === "categorias" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setSeccion("categorias");
                }}>
                <span className="material-symbols-outlined">category</span>
                <span>Categorías</span>
              </a>
              <a href="#lugares" className={seccion === "lugares" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setSeccion("lugares");
                }}>
                <span className="material-symbols-outlined">location_on</span>
                <span>Lugares</span>
              </a>
            </nav>

            {/* =====================================================
                 SECCIÓN DE USUARIOS
                 ===================================================== */}
            {seccion === "usuarios" && (
              <section id="usuarios">
                <div className="admin-section-head">
                  <div>
                    <h2>Gestión de usuarios</h2>
                    <p>Registra, modifica y elimina cuentas del sistema.</p>
                  </div>
                  <span className="admin-stat">{usuarios.length} registros</span>
                </div>

                <div className="admin-workspace">
                  <div className="admin-editor">
                    <h3>{usuarioEditId
                        ? "Actualizar usuario"
                        : "Registrar usuario"}
                    </h3>
                    <form className="admin-form-grid" onSubmit={guardarUsuario}>
                      <input type="hidden" value={usuarioEditId} readOnly />
                      <div className="admin-field">
                        <label htmlFor="usuario-nombres">Nombres</label>
                        <input
                          id="usuario-nombres"
                          name="nombres"
                          value={usuarioForm.nombres}
                          onChange={(e) =>
                            setUsuarioForm({...usuarioForm, nombres: e.target.value,})
                          }required
                        />
                      </div>
                      <div className="admin-field">
                        <label htmlFor="usuario-apellidos">Apellidos</label>
                        <input
                          id="usuario-apellidos"
                          name="apellidos"
                          value={usuarioForm.apellidos}
                          onChange={(e) =>
                            setUsuarioForm({...usuarioForm, apellidos: e.target.value,})
                          }required
                        />
                      </div>
                      <div className="admin-field">
                        <label htmlFor="usuario-documento">Documento</label>
                        <input
                          id="usuario-documento"
                          name="documento"
                          value={usuarioForm.documento}
                          onChange={(e) =>
                            setUsuarioForm({...usuarioForm, documento: e.target.value,})
                          }required
                        />
                      </div>
                      <div className="admin-field">
                        <label htmlFor="usuario-fecha">
                          Fecha de nacimiento
                        </label>
                        <input
                          id="usuario-fecha"
                          type="date"
                          name="fechaNacimiento"
                          value={usuarioForm.fechaNacimiento}
                          onChange={(e) =>
                            setUsuarioForm({...usuarioForm, fechaNacimiento: e.target.value,})
                          }required
                        />
                      </div>
                      <div className="admin-field admin-field-full">
                        <label htmlFor="usuario-correo">
                          Correo electrónico
                        </label>
                        <input
                          id="usuario-correo"
                          type="email"
                          name="correo"
                          value={usuarioForm.correo}
                          onChange={(e) =>
                            setUsuarioForm({...usuarioForm, correo: e.target.value,})
                          }required
                        />
                      </div>
                      <div className="admin-field">
                        <label htmlFor="usuario-contrasena">Contraseña</label>
                        <input
                          id="usuario-contrasena"
                          type="password"
                          name="contrasena"
                          minLength="8"
                          placeholder="Contraseña"
                          value={usuarioForm.contrasena}
                          onChange={(e) =>
                            setUsuarioForm({...usuarioForm, contrasena: e.target.value,})
                          }
                        />
                      </div>
                      <div className="admin-field">
                        <label htmlFor="usuario-rol">Rol</label>
                        <select
                          id="usuario-rol"
                          name="rol"
                          value={usuarioForm.rol}
                          onChange={(e) =>
                            setUsuarioForm({...usuarioForm, rol: e.target.value,})
                          }
                        >
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </div>
                      <div className="admin-form-actions">
                        {usuarioEditId && (
                          <button
                            type="button"
                            className="admin-btn admin-btn-secondary"
                            onClick={limpiarFormularioUsuario}>
                            <span className="material-symbols-outlined">close</span>
                            Cancelar
                          </button>
                        )}
                        <button
                          type="submit"
                          className="admin-btn admin-btn-primary">
                          <span className="material-symbols-outlined">
                            {usuarioEditId ? "save" : "person_add"}
                          </span>
                          {usuarioEditId
                            ? "Guardar cambios"
                            : "Registrar usuario"}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="admin-list">
                    <div className="admin-list-header">
                      <h3>Usuarios registrados</h3>
                    </div>
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {usuarios.map((usuario) => (
                            <tr key={usuario.idUsuario}>
                              <td className="admin-id">{usuario.idUsuario}</td>
                              <td>
                                {usuario.nombres || ""}{" "}
                                {usuario.apellidos || ""}
                              </td>
                              <td>{usuario.correo || ""}</td>
                              <td>
                                <span className="admin-role">
                                  {usuario.rol || ""}
                                </span>
                              </td>
                              <td>
                                <div className="admin-actions">
                                  <button type="button" className="admin-action-link"
                                  onClick={() => editarUsuario(usuario.idUsuario)}>
                                    Editar
                                  </button>
                                  <button
                                    type="button"
                                    className="admin-action-button"
                                    onClick={() =>
                                      eliminarUsuario(usuario.idUsuario)}>
                                    Eliminar
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* =====================================================
                 SECCIÓN DE EVENTOS
                 ===================================================== */}
            {seccion === "eventos" && (
              <section id="eventos">
                <div className="admin-section-head">
                  <div>
                    <h2>Gestión de eventos</h2>
                    <p>Administra la información que se refleja en las interfaces de eventos.</p>
                  </div>
                  <span className="admin-stat">{eventos.length} registros</span>
                </div>

                <div className="admin-workspace">
                  <div className="admin-editor">
                    <h3>
                      {eventoEditId ? "Actualizar evento" : "Registrar evento"}
                    </h3>
                    <form className="admin-form-grid" onSubmit={guardarEvento}>
                      <input type="hidden" value={eventoEditId} readOnly />
                      <div className="admin-field admin-field-full">
                        <label htmlFor="evento-titulo">Título</label>
                        <input
                          id="evento-titulo"
                          name="titulo"
                          value={eventoForm.titulo}
                          onChange={(e) =>
                            setEventoForm({...eventoForm, titulo: e.target.value,})}
                          required
                        />
                      </div>
                      <div className="admin-field admin-field-full">
                        <label htmlFor="evento-descripcion">Descripción</label>
                        <textarea
                          id="evento-descripcion"
                          name="descripcion"
                          value={eventoForm.descripcion}
                          onChange={(e) =>
                            setEventoForm({...eventoForm, descripcion: e.target.value,})}
                        />
                      </div>
                      <div className="admin-field">
                        <label htmlFor="evento-fecha">Fecha y hora</label>
                        <input
                          id="evento-fecha"
                          type="datetime-local"
                          name="fechaHora"
                          value={eventoForm.fechaHora}
                          onChange={(e) =>
                            setEventoForm({...eventoForm, fechaHora: e.target.value,})}
                          required
                        />
                      </div>
                      <div className="admin-field">
                        <label htmlFor="evento-costo">Costo</label>
                        <input
                          id="evento-costo"
                          type="number"
                          step="0.01"
                          min="0"
                          name="costo"
                          value={eventoForm.costo}
                          onChange={(e) =>
                            setEventoForm({...eventoForm, costo: e.target.value,})}
                        />
                      </div>
                      <div className="admin-field admin-field-full">
                        <label htmlFor="evento-imagen">URL de imagen</label>
                        <input
                          id="evento-imagen"
                          name="imagen"
                          value={eventoForm.imagen}
                          onChange={(e) =>
                            setEventoForm({...eventoForm, imagen: e.target.value,})}
                        />
                      </div>
                      <div className="admin-field">
                        <label htmlFor="evento-estado">Estado</label>
                        <select
                          id="evento-estado"
                          name="estado"
                          value={eventoForm.estado}
                          onChange={(e) =>
                            setEventoForm({...eventoForm, estado: e.target.value,})}>
                          <option value="ACTIVO">ACTIVO</option>
                          <option value="INACTIVO">INACTIVO</option>
                        </select>
                      </div>
                      <div className="admin-field">
                        <label htmlFor="evento-categoria">Categoría</label>
                        <select
                          id="evento-categoria"
                          name="idCategoria"
                          value={eventoForm.idCategoria}
                          onChange={(e) =>
                            setEventoForm({...eventoForm, idCategoria: e.target.value,})}
                          required>
                          <option value="">Selecciona una categoría</option>
                          {categorias.map((categoria) => (
                            <option
                              key={categoria.idCategoria}
                              value={categoria.idCategoria}>
                              {categoria.nombreCategoria}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="admin-field">
                        <label htmlFor="evento-lugar">Lugar</label>
                        <select
                          id="evento-lugar"
                          name="idLugar"
                          value={eventoForm.idLugar}
                          onChange={(e) =>
                            setEventoForm({...eventoForm, idLugar: e.target.value,})}
                          required>
                          <option value="">Selecciona un lugar</option>
                          {lugares.map((lugar) => (
                            <option key={lugar.idLugar} value={lugar.idLugar}>
                              {lugar.nombreLugar}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="admin-form-actions">
                        {eventoEditId && (
                          <button
                            type="button"
                            id="evento-cancelar"
                            className="admin-btn admin-btn-secondary"
                            onClick={limpiarFormularioEvento}>
                            <span className="material-symbols-outlined">close</span>
                            Cancelar
                          </button>
                        )}
                        <button
                          type="submit"
                          className="admin-btn admin-btn-primary">
                          <span className="material-symbols-outlined">
                            {eventoEditId ? "save" : "add"}
                          </span>
                          {eventoEditId
                            ? "Guardar cambios"
                            : "Registrar evento"}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="admin-list">
                    <div className="admin-list-header">
                      <h3>Eventos registrados</h3>
                    </div>
                    <div className="admin-card-grid">
                      {eventos.map((evento) => (
                        <article className="admin-event-card" key={evento.idEvento}>
                          <h4>{evento.titulo || ""}</h4>
                          <p className="admin-event-meta">
                            {evento.categoria?.nombreCategoria || ""} ·{" "}
                            {evento.lugar?.nombreLugar || ""}
                          </p>
                          <p className="admin-event-description">
                            {evento.descripcion || ""}
                          </p>
                          <div className="admin-card-actions">
                            <button
                              type="button"
                              className="admin-action-link"
                              onClick={() => editarEvento(evento.idEvento)}>
                              Editar
                            </button>
                            <button
                              type="button"
                              className="admin-action-button"
                              onClick={() => eliminarEvento(evento.idEvento)}>
                              Eliminar
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* =====================================================
                 SECCIÓN DE CATEGORÍAS
                 ===================================================== */}
            {seccion === "categorias" && (
              <section id="categorias">
                <div className="admin-section-head">
                  <div>
                    <h2>Gestión de categorías</h2>
                    <p>
                      Registra, modifica y elimina las categorías de eventos.
                    </p>
                  </div>
                  <span className="admin-stat">
                    {categorias.length} registros
                  </span>
                </div>

                <div className="admin-workspace">
                  <div className="admin-editor">
                    <h3>
                      {categoriaEditId
                        ? "Actualizar categoría"
                        : "Registrar categoría"}
                    </h3>
                    <form
                      className="admin-form-grid"
                      onSubmit={guardarCategoria}>
                      <input type="hidden" value={categoriaEditId} readOnly />
                      <div className="admin-field">
                        <label htmlFor="categoria-nombre">
                          Nombre de la categoría
                        </label>
                        <input
                          id="categoria-nombre"
                          type="text"
                          required
                          maxLength="100"
                          value={categoriaForm.nombreCategoria}
                          onChange={(e) =>
                            setCategoriaForm({...categoriaForm, nombreCategoria: e.target.value,})}
                        />
                      </div>
                      <div className="admin-field admin-field-full">
                        <label htmlFor="categoria-descripcion">
                          Descripción
                        </label>
                        <textarea
                          id="categoria-descripcion"
                          maxLength="255"
                          value={categoriaForm.descripcion}
                          onChange={(e) =>
                            setCategoriaForm({...categoriaForm, descripcion: e.target.value,})}
                        />
                      </div>
                      <div className="admin-form-actions">
                        {categoriaEditId && (
                          <button
                            type="button"
                            id="categoria-cancelar"
                            className="admin-btn admin-btn-secondary"
                            onClick={limpiarFormularioCategoria}>
                            <span className="material-symbols-outlined">
                              close
                            </span>
                            Cancelar
                          </button>
                        )}
                        <button
                          type="submit"
                          className="admin-btn admin-btn-primary">
                          <span className="material-symbols-outlined">
                            {categoriaEditId ? "save" : "category"}
                          </span>
                          {categoriaEditId
                            ? "Guardar cambios"
                            : "Registrar categoría"}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="admin-list">
                    <div className="admin-list-header">
                      <h3>Categorías registradas</h3>
                    </div>
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categorias.map((categoria) => (
                            <tr key={categoria.idCategoria}>
                              <td className="admin-id">
                                {categoria.idCategoria}
                              </td>
                              <td>{categoria.nombreCategoria || ""}</td>
                              <td>{categoria.descripcion || ""}</td>
                              <td>
                                <div className="admin-actions">
                                  <button
                                    type="button"
                                    className="admin-action-link"
                                    onClick={() => editarCategoria(categoria.idCategoria)}>
                                    Editar
                                  </button>
                                  <button
                                    type="button"
                                    className="admin-action-button"
                                    onClick={() => eliminarCategoria(categoria.idCategoria)}>
                                    Eliminar
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* =====================================================
                 SECCIÓN DE LUGARES
                 ===================================================== */}
            {seccion === "lugares" && (
              <section id="lugares">
                <div className="admin-section-head">
                  <div>
                    <h2>Gestión de lugares</h2>
                    <p>Registra, modifica y elimina los lugares de los eventos.</p>
                  </div>
                  <span className="admin-stat">{lugares.length} registros</span>
                </div>

                <div className="admin-workspace">
                  <div className="admin-editor">
                    <h3>{lugarEditId ? "Actualizar lugar" : "Registrar lugar"}</h3>
                    <form className="admin-form-grid" onSubmit={guardarLugar}>
                      <input type="hidden" value={lugarEditId} readOnly />
                      <div className="admin-field">
                        <label htmlFor="lugar-nombre">Nombre del lugar</label>
                        <input
                          id="lugar-nombre"
                          type="text"
                          required
                          maxLength="150"
                          value={lugarForm.nombreLugar}
                          onChange={(e) =>
                            setLugarForm({...lugarForm, nombreLugar: e.target.value,})}
                        />
                      </div>
                      <div className="admin-field">
                        <label htmlFor="lugar-direccion">Dirección</label>
                        <input
                          id="lugar-direccion"
                          type="text"
                          maxLength="200"
                          value={lugarForm.direccion}
                          onChange={(e) =>
                            setLugarForm({...lugarForm, direccion: e.target.value,})}
                        />
                      </div>
                      <div className="admin-field">
                        <label htmlFor="lugar-localidad">Localidad</label>
                        <input
                          id="lugar-localidad"
                          type="text"
                          maxLength="100"
                          value={lugarForm.localidad}
                          onChange={(e) =>
                            setLugarForm({...lugarForm, localidad: e.target.value,})}
                        />
                      </div>
                      <div className="admin-field">
                        <label htmlFor="lugar-telefono">Teléfono</label>
                        <input
                          id="lugar-telefono"
                          type="text"
                          maxLength="150"
                          value={lugarForm.telefono}
                          onChange={(e) =>
                            setLugarForm({...lugarForm, telefono: e.target.value,})}
                        />
                      </div>
                      <div className="admin-field">
                        <label htmlFor="lugar-latitud">Latitud</label>
                        <input
                          id="lugar-latitud"
                          type="number"
                          step="any"
                          value={lugarForm.latitud}
                          onChange={(e) =>
                            setLugarForm({...lugarForm, latitud: e.target.value,})}
                        />
                      </div>
                      <div className="admin-field">
                        <label htmlFor="lugar-longitud">Longitud</label>
                        <input
                          id="lugar-longitud"
                          type="number"
                          step="any"
                          value={lugarForm.longitud}
                          onChange={(e) =>
                            setLugarForm({...lugarForm, longitud: e.target.value,})}
                        />
                      </div>
                      <div className="admin-field admin-field-full">
                        <label htmlFor="lugar-pagina">Página web</label>
                        <input
                          id="lugar-pagina"
                          type="text"
                          maxLength="255"
                          value={lugarForm.paginaWeb}
                          onChange={(e) =>
                            setLugarForm({...lugarForm, paginaWeb: e.target.value,})}
                        />
                      </div>
                      <div className="admin-form-actions">
                        {lugarEditId && (
                          <button
                            type="button"
                            id="lugar-cancelar"
                            className="admin-btn admin-btn-secondary"
                            onClick={limpiarFormularioLugar}>
                            <span className="material-symbols-outlined">close</span>
                            Cancelar
                          </button>
                        )}
                        <button
                          type="submit"
                          className="admin-btn admin-btn-primary"
                        >
                          <span className="material-symbols-outlined">
                            {lugarEditId ? "save" : "location_on"}
                          </span>
                          {lugarEditId ? "Actualizar lugar" : "Registrar lugar"}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="admin-list">
                    <div className="admin-list-header">
                      <h3>Lugares registrados</h3>
                    </div>
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Localidad</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lugares.map((lugar) => (
                            <tr key={lugar.idLugar}>
                              <td className="admin-id">{lugar.idLugar}</td>
                              <td>{lugar.nombreLugar || ""}</td>
                              <td>{lugar.direccion || ""}</td>
                              <td>{lugar.localidad || ""}</td>
                              <td>{lugar.telefono || ""}</td>
                              <td>
                                <div className="admin-actions">
                                  <button
                                    type="button"
                                    className="admin-action-link"
                                    onClick={() => editarLugar(lugar.idLugar)}>
                                    Editar
                                  </button>
                                  <button
                                    type="button"
                                    className="admin-action-button"
                                    onClick={() => eliminarLugar(lugar.idLugar)}>
                                    Eliminar
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </section>
        </main>

        <div className="admin-footer-note">
          CulturaTech Bogotá · Gestión administrativa del sistema.
        </div>
      </div>

      {/* Modal original de confirmación de seguridad para operaciones con usuarios. */}
      <div className="admin-modal" hidden={!modalSeguridad}>
        <div className="admin-modal-content">
          <div className="admin-modal-header">
            <div>
              <span className="admin-eyebrow">SEGURIDAD</span>
              <h2>{modalSeguridad?.titulo || "Confirmación de seguridad"}</h2>
            </div>
            <button
              type="button"
              className="admin-modal-close"
              aria-label="Cerrar"
              onClick={() => cerrarModalSeguridad(null)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="admin-modal-message">
            {modalSeguridad?.mensaje || ""}
          </div>

          <form className="admin-form-grid" onSubmit={confirmarSeguridad}>
            {modalSeguridad?.modo === "admin" && (
              <div className="admin-field admin-field-full">
                <label htmlFor="usuario-contrasena-seguridad">
                  Contraseña del administrador
                </label>

                <input
                  id="usuario-contrasena-seguridad"
                  type="password"
                  autoComplete="current-password"
                  value={camposSeguridad.contrasenaSeguridad}
                  onChange={(e) =>
                    setCamposSeguridad({...camposSeguridad, contrasenaSeguridad: e.target.value,})}
                />
              </div>
            )}

            {modalSeguridad?.modo === "propia" && (
              <div className="admin-field admin-field-full">
                <label htmlFor="usuario-contrasena-actual">
                  Contraseña actual
                </label>

                <input
                  id="usuario-contrasena-actual"
                  type="password"
                  autoComplete="current-password"
                  value={camposSeguridad.contrasenaActual}
                  onChange={(e) =>
                    setCamposSeguridad({...camposSeguridad, contrasenaActual: e.target.value,})}
                />
              </div>
            )}

            {modalSeguridad?.modo === "propia" && (
              <div className="admin-field admin-field-full">
                <label htmlFor="usuario-nueva-contrasena">
                  Nueva contraseña
                </label>

                <input
                  id="usuario-nueva-contrasena"
                  type="password"
                  minLength="8"
                  autoComplete="new-password"
                  value={camposSeguridad.nuevaContrasena}
                  onChange={(e) =>
                    setCamposSeguridad({...camposSeguridad, nuevaContrasena: e.target.value,})}
                />
              </div>
            )}

            {modalSeguridad?.modo === "propia" && (
              <div className="admin-field admin-field-full">
                <label htmlFor="usuario-confirmar-contrasena">
                  Confirmar nueva contraseña
                </label>

                <input
                  id="usuario-confirmar-contrasena"
                  type="password"
                  minLength="8"
                  autoComplete="new-password"
                  value={camposSeguridad.confirmarContrasena}
                  onChange={(e) =>
                    setCamposSeguridad({...camposSeguridad, confirmarContrasena: e.target.value,})}
                />
              </div>
            )}

            <div className="admin-form-actions">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => cerrarModalSeguridad(null)}>
                Cancelar
              </button>

              <button type="submit" className="admin-btn admin-btn-primary">
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}