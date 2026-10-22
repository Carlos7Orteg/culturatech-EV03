> # Auditoría integral de un proyecto existente y migración guiada a React

  Quiero migrar un proyecto existente a una nueva aplicación web basada en React, con una arquitectura profesional,
  código mantenible y buenas prácticas de desarrollo.

  **IMPORTANTE: EL PROYECTO ORIGINAL ES EXCLUSIVAMENTE DE LECTURA. NO DEBES MODIFICARLO BAJO NINGUNA CIRCUNSTANCIA.**

  Tu función es actuar como arquitecto de software, desarrollador full-stack senior y auditor técnico. Debes analizar
  exhaustivamente el proyecto original y proporcionarme las indicaciones necesarias para que yo construya el nuevo
  proyecto React paso a paso.

  ## FASE 1. Auditoría completa del proyecto original

  Antes de proponer soluciones o escribir código, inspecciona y analiza todo lo que sea relevante del proyecto
  existente.

  Revisa:

  1. **Estructura y arquitectura**

     * Organización de carpetas y archivos.
     * Tecnologías, lenguajes, frameworks y dependencias.
     * Puntos de entrada, configuración y convenciones.
     * Organización y responsabilidades de los módulos.

  2. **Frontend**

     * Todas las páginas, vistas, componentes y layouts.
     * Diseño visual, estilos, tipografías, colores, iconos y espaciados.
     * Responsive design para móviles, tabletas y escritorio.
     * Navegación, menús, formularios, tablas, modales y demás componentes interactivos.
     * Estados de carga, mensajes de error, validaciones y estados vacíos.
     * Accesibilidad, experiencia de usuario y consistencia visual.
     * Lógica JavaScript o TypeScript y dependencias entre componentes.

  3. **Backend**

     * Lenguaje, framework y arquitectura.
     * Rutas, controladores, servicios y middleware.
     * APIs, endpoints, métodos HTTP y formatos de respuesta.
     * Autenticación, autorización, sesiones y permisos.
     * Validación de datos, gestión de errores y medidas de seguridad.
     * Procesos de negocio, reglas de negocio y dependencias internas.

  4. **Base de datos e integraciones**

     * Motor de base de datos, estructura de tablas y relaciones.
     * Consultas, modelos, migraciones y mecanismos de persistencia.
     * Servicios externos, APIs de terceros, archivos y almacenamiento.
     * Variables de entorno y configuraciones necesarias, sin mostrar ni copiar secretos.

  5. **Funcionalidades**

     * Identifica todas las funcionalidades existentes y cómo funcionan.
     * Relaciona cada funcionalidad con sus páginas, componentes, endpoints y datos.
     * Detecta dependencias entre funcionalidades.
     * Identifica errores, duplicaciones, código frágil, riesgos y posibles mejoras.
     * Distingue las funcionalidades verificadas de aquellas que solo pueden inferirse del código.

  6. **Pruebas y ejecución**

     * Revisa las pruebas existentes, scripts, instrucciones de instalación y ejecución.
     * Determina qué puede verificarse de forma segura sin alterar el proyecto original.
     * No ejecutes migraciones, comandos destructivos, instalaciones ni procesos que puedan modificar archivos o datos
  del original.

  ## FASE 2. Informe técnico antes de desarrollar

  Cuando termines la auditoría, presenta un informe detallado que incluya:

  1. Resumen general del proyecto y su estado actual.
  2. Arquitectura y tecnologías existentes.
  3. Inventario de páginas, componentes y funcionalidades.
  4. Flujo de comunicación entre frontend, backend y base de datos.
  5. Endpoints y contratos de API identificados.
  6. Descripción del diseño visual y comportamiento responsive.
  7. Problemas técnicos, riesgos y deuda técnica detectados.
  8. Funcionalidades que deben conservarse en la nueva versión.
  9. Requisitos faltantes, dudas y decisiones que debo confirmar.
  10. Propuesta de arquitectura para la nueva aplicación React.
  11. Tecnologías recomendadas y justificación de cada elección.
  12. Estructura de carpetas propuesta para el nuevo proyecto.
  13. Plan de migración por etapas, con dependencias, riesgos y criterios de aceptación.
  14. Estrategia de pruebas y verificación para comprobar que la nueva aplicación conserva las funcionalidades
  originales.

  No inventes funcionalidades, endpoints, esquemas de base de datos ni comportamientos que no hayas podido verificar.
  Señala claramente cualquier información que falte.

  ## FASE 3. Migración guiada a un proyecto nuevo

  Después de entregarme el informe, detente y espera mi aprobación.

  La migración debe realizarse exclusivamente en una carpeta nueva e independiente. El proyecto original debe
  permanecer intacto.

  Quiero que me guíes para que yo mismo realice los cambios. No quiero que implementes automáticamente toda la
  aplicación ni que ejecutes una serie de tareas sin mi intervención.

  Para cada etapa debes:

  1. Explicarme el objetivo y por qué es necesario.
  2. Indicarme qué herramientas, comandos y archivos debo utilizar.
  3. Proporcionarme los comandos exactos que debo ejecutar.
  4. Mostrarme el código completo de cada archivo nuevo o la modificación propuesta para el nuevo proyecto.
  5. Explicarme dónde colocar cada archivo y cómo se relaciona con el resto.
  6. Indicarme cómo ejecutar y verificar el resultado.
  7. Definir los criterios para considerar la etapa terminada.
  8. Esperar a que yo realice los pasos y te comunique el resultado.

  **No avances a la siguiente etapa hasta que yo confirme expresamente que la actual está terminada y apruebe
  continuar.**

  Si detectas que falta información o hay varias decisiones arquitectónicas importantes, pregúntame antes de continuar.

  ## FASE 4. Principios obligatorios

  * El proyecto original es de solo lectura.
  * No modifiques, elimines, renombres, muevas ni sobrescribas archivos del proyecto original.
  * No crees archivos auxiliares, documentación, configuraciones ni informes dentro del original.
  * No instales dependencias ni ejecutes comandos con efectos secundarios en el original.
  * No copies secretos, credenciales, tokens ni datos sensibles.
  * Todo el nuevo código debe crearse en la nueva carpeta que yo indique y apruebe.
  * Conserva las funcionalidades y reglas de negocio existentes, salvo que yo apruebe expresamente un cambio.
  * Prioriza seguridad, accesibilidad, rendimiento, diseño responsive y mantenibilidad.
  * Incluye validaciones, gestión de errores y pruebas automatizadas apropiadas.
  * No afirmes que has ejecutado o superado pruebas que no hayas ejecutado.
  * Si algo no puede verificarse, indícalo claramente.
  * No realices cambios importantes sin explicarme primero su impacto y obtener mi aprobación.

  ## PRIMERA ACCIÓN

  Por ahora, realiza exclusivamente la auditoría de lectura del proyecto original.

  No generes código para la nueva aplicación todavía. No modifiques ningún archivo. No comiences la migración.

  Primero, inspecciona el proyecto, identifica sus tecnologías y estructura, analiza el frontend y el backend, y
  prepara el informe técnico de la FASE 2.

  Si necesitas ejecutar alguna operación que pueda modificar archivos, dependencias, bases de datos o configuraciones,
  detente y solicítame autorización.

  Al terminar el informe, espera mis instrucciones para decidir cómo y cuándo iniciar la migración a React.

○ Thought for 1m 23s (Inspecting the Drawer's links to identify which pages are available. The goal is to determine...)
● Ran (Get-ChildItem -Force)
● Explored 2 files (pom.xml, README.md)
… 45 more actions (41 reads, 4 commands) …
● Ran (Get-ChildItem src/main/resources/static/pages)
● Explored 7 files (searchModal.js, chrome.js, header.js, +4) (ctrl+o to expand)

▸ Thought for 31s
  Considering which specific annotations and logic adjustments in controllers are needed for secure authentication a...
   Informe Técnico y Auditoría Integral de Arquitectura: Proyecto «CulturaTech Bogotá» (AA3-EV01)

  │ Important
  │ Estado de la auditoría: Fase 1 y Fase 2 completadas. El proyecto original ha sido inspeccionado en modo de
  │ estricta solo lectura sin alterar, mover, compilar ni modificar ningún archivo ni base de datos existente. No se
  │ ha generado código de migración aún, a la espera de su revisión y aprobación.
  ──────
  ## 1. Resumen general del proyecto y su estado actual

  El proyecto CulturaTech Bogotá (AA3-EV01) es una aplicación web concebida para la divulgación, exploración y
  gestión administrativa de la agenda cultural, eventos, escenarios y categorías artísticas del Distrito Capital.

  ### Estado Actual del Software

  • Naturaleza del desarrollo: Proyecto académico de formación ADSO (SENA) desarrollado por Carlos Rodrigo Ortegón.
  • Topología arquitectónica: Aplicación monolítica empaquetada con Spring Boot que sirve simultáneamente una API
  REST en Java y una interfaz web estática multi-página (MPA) compuesta por HTML5, CSS3 artesanal y JavaScript
  vanilla estructurado por componentes imperativos.
  • Grado de madurez:
      • Módulos CRUD de Eventos, Categorías, Lugares y Usuarios: Completos y operativos a nivel de base de datos y
      API.
      • Autenticación y gestión de perfil: Funcional con sesión de Servlet (HttpSession) y almacenamiento
      complementario en localStorage.
      • Módulos de Agenda Personal, Favoritos y Notificaciones: Parciales. Están definidos en el esquema SQL
      relacional y simulados en la capa cliente mediante localStorage, pero carecen de entidades y endpoints REST en
      Spring Boot, y sus páginas dedicadas (agenda.html, favorites.html, notifications.html) no existen físicamente
      en el frontend.

  ──────
  ## 2. Arquitectura y tecnologías existentes

  ### 2.1 Backend y Persistencia

  • Lenguaje de programación: Java 21 LTS (pom.xml:30).
  • Framework base: Spring Boot (spring-boot-starter-webmvc, spring-boot-starter-data-jpa) administrado con Apache
  Maven (pom.xml:32-57).
  • Capa ORM / Persistencia: Jakarta Persistence (JPA 3.x) implementada con Hibernate ORM y conector MySQL (mysql-
  connector-j).
  • Motor de Base de Datos: MySQL 8.0.x (base de datos relacional culturatechbg, script culturatechbg-ev01.sql).
  • Seguridad y Criptografía: Algoritmo PBKDF2 con HmacSHA256, salt criptográfico aleatorio de 16 bytes y 120.000
  iteraciones implementado en PasswordUtil.java. No se utiliza Spring Security.

  ### 2.2 Frontend

  • Arquitectura de presentación: Multi-Page Application (MPA) servida directamente desde el classpath estático de
  Spring Boot (static/).
  • Motor de renderizado: Vanilla JavaScript estructurado con funciones render() basadas en plantillas de cadenas
  (template literals), inyectadas mediante innerHTML y sincronizadas con helpers de preservación de foco
  (withFocusPreserved).
  • Estilos y Maquetación: Tailwind CSS cargado dinámicamente desde CDN en tiempo de ejecución (<script
  src="https://cdn.tailwindcss.com"></script>), complementado con una hoja de estilo personalizada de 1.981 líneas
  (estilos.css).
  • Iconografía y Tipografía: Google Fonts (Inter, Hanken Grotesk, Geist) y Google Material Symbols Outlined.

  │ Diagram exceeds terminal width (512 > 119 cols)
  │ Displayed as code block. Widen terminal to view inline.

    graph TD
        subgraph Cliente ["Frontend (Navegador Web)"]
            UI["Páginas HTML + Tailwind CDN + estilos.css"]
            JSComp["Componentes JS Vanilla (Home, Events, Admin, Chrome)"]
            Storage["localStorage (Usuario, Favoritos, Agenda)"]
        end

        subgraph Servidor ["Backend (Spring Boot 4.x / Java 21)"]
            StaticFilter["Resource Handler (/static/*)"]
            AuthCtrl["AuthController (/api/auth/*)"]
            EventCtrl["EventoController (/api/eventos/*)"]
            CatCtrl["CategoriaController (/api/categorias/*)"]
            LugCtrl["LugarController (/api/lugares/*)"]
            UsrCtrl["UsuarioController (/api/usuarios/*)"]
            PassUtil["PasswordUtil (PBKDF2)"]
        end

        subgraph Persistencia ["Capa de Datos"]
            Repos["Spring Data JPA Repositories"]
            Hibernate["Hibernate ORM"]
            MySQL[("MySQL 8.0 (culturatechbg)")]
        end

        UI --> JSComp
        JSComp <--> Storage
        JSComp -- "Fetch API (JSON HTTP)" --> AuthCtrl
        JSComp -- "Fetch API (JSON HTTP)" --> EventCtrl
        JSComp -- "Fetch API (JSON HTTP)" --> CatCtrl
        JSComp -- "Fetch API (JSON HTTP)" --> LugCtrl
        JSComp -- "Fetch API (JSON HTTP)" --> UsrCtrl
        AuthCtrl --> PassUtil
        UsrCtrl --> PassUtil
        AuthCtrl --> Repos
        EventCtrl --> Repos
        CatCtrl --> Repos
        LugCtrl --> Repos
        UsrCtrl --> Repos
        Repos --> Hibernate --> MySQL
  ──────
  ## 3. Inventario de páginas, componentes y funcionalidades

  ### 3.1 Inventario de Vistas / Páginas

| Archivo físico       | Clave de vista (`data-page`) | Acceso / Rol             | Propósito y elementos principales |
|----------------------|------------------------------|--------------------------|-----------------------------------|
| `index.html`         | `home`                       | Público / Usuario        | Landing page de entrada directa. Duplica la estructura visual de `home.html`. |
| `home.html`          | `home`                       | Autenticado (USER/ADMIN) | Carrusel de eventos destacados, filtro rápido de categorías en pastillas, grilla paginada de eventos, botones de favoritos y agenda. |
| `events.html`        | `events`                     | Autenticado (USER/ADMIN) | Catálogo general de eventos con barra de búsqueda reactiva, menús desplegables de filtro por categoría y rango de fechas, y paginación. |
| `event-detail.html`  | `event-detail`               | Autenticado (USER/ADMIN) | Vista de detalle basada en el parámetro URL (`?id=...`), información de ubicación y georreferenciación, cronograma, eventos recomendados y acción de compartir. |
| `login.html`         | `login`                      | Público                  | Formulario de autenticación con validación en vivo y medidor de robustez de seguridad de la contraseña. |


  ### 3.2 Inventario de Módulos JavaScript (Componentes del Frontend)

  • state.js: Gestor de estado global y persistencia en localStorage (AppState: usuario activo, intentos fallidos,
  favoritos, agenda, notificaciones).
  • chrome.js: Inicializador y orquestador del cascarón de la interfaz (initChrome, refreshChrome,
  withFocusPreserved).
  • header.js: Barra de navegación superior (botón hamburguesa, logo central, buscador modal y badge de
  notificaciones).
  • drawer.js: Menú lateral deslizante con datos del usuario en sesión, navegación condicionada por rol y botón de
  cierre de sesión.
  • bottomNav.js: Barra de navegación fija inferior para dispositivos móviles con indicadores de insignias.
  • footer.js: Pie de página responsive adaptado a escritorio, tabletas y móviles.
  • searchModal.js: Diálogo modal para búsqueda instantánea en memoria sobre el listado de eventos cargados.
  • logo.js: Componente generador del logotipo vectorial/gráfico con variantes de tamaño y tema.
  ──────
  ## 4. Flujo de comunicación entre frontend, backend y base de datos

  El ciclo de vida de las peticiones en la aplicación actual opera de la siguiente manera:

  1. Carga y Autenticación:
      • Al cargar cualquier vista protegida, state.js:50-69 verifica si existe la clave culturatech_user en
      localStorage. Si no existe, redirige de inmediato a login.html.
      • En el inicio de sesión, login.js:630-668 emite POST /api/auth/login. AuthController.java:33-49 consulta al
      usuario por correo, verifica el hash con PBKDF2 y almacena el ID del usuario en el objeto HttpSession del
      contenedor de servlets (creando una cookie JSESSIONID).
  2. Carga de Datos de Eventos y Catálogos:
      • home.js:351 y events.js:14 ejecutan GET /api/eventos. EventoController.java:40 utiliza EventoRepository para
      obtener las entidades de MySQL mediante Hibernate, deserializando las relaciones @ManyToOne con Categoria y
      Lugar.
      • El cliente recibe el arreglo JSON de eventos y lo transforma en un modelo de presentación interno (title,
      imageUrl, date, time, category, location).
  3. Persistencia Híbrida (Desconexión BD - Frontend):
      • Cuando el usuario marca un evento como favorito o lo añade a su agenda, el cambio se persiste exclusivamente
      en el navegador (localStorage.setItem('culturatech_favorites', ...)), sin invocar al servidor, a pesar de que
      MySQL posee las tablas favorito y agenda_personal.

  ──────
  ## 5. Endpoints y contratos de API identificados

  ### Módulo de Autenticación y Perfil (/api/auth) — AuthController.java

| Método | Endpoint                  | Cabeceras / Auth  | Request Body                                                                                         | Códigos HTTP  | Respuesta / Formato                                      |
|--------|---------------------------|-------------------|------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------|
| POST   | `/api/auth/login`         | Ninguna           | `{"correo": string, "contrasena": string}`                                                           | 200, 401      | `{"ok": true, "usuario": Usuario}` o `{"ok": false, "mensaje": string}` |
| GET    | `/api/auth/perfil`        | Cookie JSESSIONID | Ninguno                                                                                              | 200, 401, 404 | Objeto `Usuario` en JSON                                 |
| PUT    | `/api/auth/perfil`        | Cookie JSESSIONID | `{"contrasenaActual": string, "nuevaContrasena": string, "confirmarContrasena": string}`             | 200, 400, 401, 404 | `{"ok": true, "mensaje": string}`                    |
| PUT    | `/api/auth/perfil/datos`  | Cookie JSESSIONID | `{"nombres": string, "apellidos": string, "documento": string, "fechaNacimiento": "YYYY-MM-DD", "correo": string}` | 200, 401, 404 | `{"ok": true, "mensaje": string}`                    |
| POST   | `/api/auth/perfil/eliminar` | Cookie JSESSIONID | Formulario / Ninguno                                                                                | 302, 401, 404 | Redirección HTTP. `Location: /pages/login.html`          |

  ### Módulo de Usuarios (/api/usuarios) — UsuarioController.java

| Método | Endpoint             | Cabeceras / Auth                              | Request Body                                                                                                                                                                                                                         | Códigos HTTP       | Respuesta / Formato |
|--------|----------------------|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|---------------------|
| GET    | `/api/usuarios`      | Ninguna (Público)                             | Ninguno                                                                                                                                                                                                                              | 200                | Lista de entidades `Usuario` con contraseña hasheada. |
| GET    | `/api/usuarios/{id}` | Ninguna (Público)                             | Ninguno                                                                                                                                                                                                                              | 200, 404           | Entidad `Usuario`. |
| POST   | `/api/usuarios`      | Ninguna (Público)                             | Objeto `Usuario` (incluye contraseña en texto plano).                                                                                                                                                                                | 200                | Entidad `Usuario` guardada con hash generado. |
| PUT    | `/api/usuarios/{id}` | Cookie `JSESSIONID` (requiere rol `ADMIN`)    | `{"usuario": Usuario, "contrasenaSeguridad"?: string, "contrasenaActual"?: string, "nuevaContrasena"?: string, "confirmarContrasena"?: string}`                                                                                     | 200, 400, 401, 403, 404 | Entidad `Usuario` actualizada. |
| DELETE | `/api/usuarios/{id}` | Ninguna (sin validación de rol en backend)    | Ninguno                                                                                                                                                                                                                              | 200, 404           | Mensaje plano: `"Usuario eliminado correctamente."` |

  ### Módulo de Eventos (/api/eventos) — EventoController.java

   | Método | Endpoint           | Cabeceras / Auth  | Request Body     | Códigos HTTP | Respuesta / Formato |
|--------|--------------------|-------------------|------------------|--------------|---------------------|
| GET    | `/api/eventos`     | Ninguna (Público) | Ninguno          | 200          | Lista de Evento (con relaciones anidadas) |
| GET    | `/api/eventos/{id}`| Ninguna (Público) | Ninguno          | 200, null    | Entidad Evento |
| POST   | `/api/eventos`     | Ninguna (Público) | Objeto Evento con `{categoria: {idCategoria}, lugar: {idLugar}}` | 200 | Entidad Evento creada |
| PUT    | `/api/eventos/{id}`| Ninguna (Público) | Objeto Evento completo | 200 | Entidad Evento modificada |
| DELETE | `/api/eventos/{id}`| Ninguna (Público) | Ninguno          | 200          | Vacía |

  ### Módulo de Categorías (/api/categorias) — CategoriaController.java

  | Método | Endpoint               | Cabeceras / Auth  | Request Body                                      | Códigos HTTP | Respuesta / Formato |
|--------|------------------------|-------------------|---------------------------------------------------|--------------|---------------------|
| GET    | `/api/categorias`      | Ninguna (Público) | Ninguno                                           | 200          | Lista de Categoria  |
| GET    | `/api/categorias/{id}` | Ninguna (Público) | Ninguno                                           | 200, null    | Entidad Categoria   |
| POST   | `/api/categorias`      | Ninguna (Público) | `{"nombreCategoria": string, "descripcion": string}` | 200      | Entidad creada      |
| PUT    | `/api/categorias/{id}` | Ninguna (Público) | `{"nombreCategoria": string, "descripcion": string}` | 200      | Entidad actualizada |
| DELETE | `/api/categorias/{id}` | Ninguna (Público) | Ninguno                                           | 200          | Vacía               |

  ### Módulo de Lugares (/api/lugares) — LugarController.java

 | Método | Endpoint          | Cabeceras / Auth  | Request Body | Códigos HTTP | Respuesta / Formato |
|--------|-------------------|-------------------|--------------|--------------|---------------------|
| GET    | `/api/lugares`    | Ninguna (Público) | Ninguno      | 200          | Lista de Lugar |
| GET    | `/api/lugares/{id}` | Ninguna (Público) | Ninguno    | 200, null    | Entidad Lugar |
| POST   | `/api/lugares`    | Ninguna (Público) | Objeto Lugar | 200, 400     | Entidad creada o mensaje de error (duplicado) |
| PUT    | `/api/lugares/{id}` | Ninguna (Público) | Objeto Lugar | 200, 400   | Entidad actualizada o mensaje de error (duplicado) |
| DELETE | `/api/lugares/{id}` | Ninguna (Público) | Ninguno    | 200, 404     | Mensaje plano de confirmación |
  ──────
  ## 6. Descripción del diseño visual y comportamiento responsive

  ### 6.1 Sistema de Diseño, Paleta Cromática y Tipografía

  El diseño visual está estandarizado mediante variables CSS en estilos.css:1-35:

  • Gama de Azules Profundos (Identidad Institucional): #0d1b2a (--c-2, darkbl), #0f1c2c (--c-3, darkbln), #001d32 (-
  -c-26, darkblg). Utilizados en cabeceras, fondos nocturnos y botones principales.
  • Tonos de Fondo Suaves: #f9faf5 (--c-22, cremlg), #f3f4f0 (--c-21, crem), #ffffff (blanco puro). Generan una
  estética limpia y legible.
  • Colores de Acento y Marca: #ffab69 (--c-23, brand), #2d8aca (--c-9, accent), #004b74 (--c-1, blue), #d6e4f9 (--c-
  27, lightazl).
  • Estados Semánticos: #ba1a1a / #93000a (danger), #146c2e (success), #d97724 (warning).
  • Tipografías:
      • Títulos y encabezados destacados: Hanken Grotesk (sans-serif moderno y geométrico).
      • Etiquetas, insignias y botones: Geist (monoespaciado estilizado y legible en tamaños pequeños).
      • Textos de cuerpo y formularios: Inter (alta legibilidad en pantalla).


  ### 6.2 Comportamiento Responsive por Breakpoint

  • Móvil (< 768px):
      • La navegación primaria inferior pasa a la barra fija BottomNav con accesos rápidos (Inicio, Explorar, Agenda,
      Favoritos, Avisos, Arriba).
      • Los carruseles destacados adoptan una relación de aspecto 16:9.
      • La fila de categorías filtra a 5 elementos visibles.
      • El menú principal se oculta tras el botón hamburguesa que abre el Drawer modal con fondo oscurecido
      (backdrop).
  • Tableta (768px – 1023px):
      • Se oculta la barra inferior móvil y entra en funcionamiento la barra de navegación intermedia tipo grilla
      dentro del Footer.
      • El encabezado superior amplía el espaciado horizontal a px-10.
      • Los formularios de autenticación y registro se centran en tarjetas de ancho acotado (max-w-lg).
  • Escritorio (≥ 1024px):
      • Las vistas de registro y login se presentan en estructura de dos columnas (panel ilustrativo / informativo a
      la izquierda y tarjeta de formulario a la derecha).
      • En la página de detalle de eventos se despliega una grilla asimétrica (8 columnas para narrativa y cronograma;
      4 columnas para datos de ubicación, contacto y mapa).
      • El carrusel principal pasa a relación de aspecto cinematográfica 21:9.

  ──────
  ## 7. Problemas técnicos, riesgos y deuda técnica detectados

  │ Warning
  │ La siguiente lista de hallazgos representa riesgos críticos de seguridad, consistencia y mantenimiento
  │ identificados en el código auditado:

  1. Credenciales en texto plano y error sintáctico en configuración:
      • En application.properties:7, la contraseña de la base de datos se encuentra en texto claro y la propiedad
      está mal escrita con dos puntos consecutivos: spring.datasource..password=....
  2. Filtración crítica de credenciales hasheadas en respuestas JSON:
      • La entidad Usuario.java:47-49 no tiene anotado @JsonIgnore ni @JsonProperty(access = Access.WRITE_ONLY) sobre
      el campo o getter de contrasena. En consecuencia, GET /api/usuarios, GET /api/usuarios/{id}, POST
      /api/auth/login y POST /api/usuarios exponen el hash PBKDF2 de todos los usuarios en cada respuesta JSON.
  3. Ausencia de control de acceso en endpoints sensibles (IDOR / Broken Access Control):
      • GET /api/usuarios y GET /api/usuarios/{id} son completamente públicos: cualquier usuario anónimo puede
      extraer la lista íntegra de usuarios con documentos, nombres y correos.
      • DELETE /api/usuarios/{id} en UsuarioController.java:323-338 no verifica sesión ni permisos de ADMIN.
      Cualquier petición HTTP DELETE elimina usuarios arbitrarios.
      • Las operaciones de escritura (POST, PUT, DELETE) en EventoController.java, CategoriaController.java y
      LugarController.java no requieren sesión ni rol administrativo en el backend.
  4. Mecanismo de sesión híbrido e inconsistente:
      • El backend gestiona sesiones en memoria con HttpSession, pero el frontend delega las decisiones de navegación
      y permisos en localStorage.getItem('culturatech_user'). Un usuario puede modificar el rol en la consola del
      navegador a ADMIN y acceder visualmente al panel administrativo.
      • En state.js:140, la función logout() invoca fetch('../LogoutServlet'), un servlet que no existe en el
      proyecto Spring Boot. La sesión real de backend nunca se destruye durante el cierre de sesión normal.
  5. Inconsistencia en el empaquetado del código Java:
      • Evento.java:5 reside en el paquete raíz com.culturatech.culturatechev01, mientras que las demás entidades
      están en com.culturatech.culturatechev01.model.
  6. Desconexión del modelo de base de datos:
      • Existen las tablas agenda_personal, favorito y notificacion en el script SQL de MySQL, pero no existen
      entidades JPA, repositorios ni controladores asociados. El frontend opera con datos volátiles en el
      almacenamiento local del navegador.
  7. Páginas faltantes referenciadas en el UI Shell:
      • El menú lateral y las barras de navegación apuntan a /pages/favorites.html, /pages/agenda.html y
      /pages/notifications.html, las cuales no existen en disco (provocan error 404).
  8. Uso de Tailwind CSS en CDN para producción:
      • Cargar https://cdn.tailwindcss.com genera problemas de rendimiento, bloqueos de renderizado y advertencias
      explícitas de la librería indicando que no debe utilizarse en entornos de producción.

  ──────
  ## 8. Funcionalidades que deben conservarse en la nueva versión React

  1. Catálogo y visualización pública/privada de eventos culturales:
      • Carrusel principal de eventos destacados con navegación por flechas, puntos e intervalos.
      • Filtro reactivo por categorías (Música, Teatro, Arte, Cine, Danza, etc.).
      • Filtro reactivo por temporalidad (Próximos eventos, Hoy, Próximos 7 días, Este mes, Próximo mes).
      • Búsqueda en tiempo real por texto libre en títulos, descripciones, lugares y localidades.
      • Paginación dinámica (6 elementos por página).
  2. Ficha de detalle exhaustiva del evento:
      • Banner de cabecera con categoría y costo formateado (Entrada Libre o cifra en pesos colombianos $X COP).
      • Descripción enriquecida con detección y apertura de enlaces web externos.
      • Bloque de cronograma por horas.
      • Tarjeta informativa del lugar con dirección, localidad, teléfono, enlace al sitio web y botón de ubicación.
      • Carrusel de recomendaciones relacionadas.
  3. Módulo de Autenticación y Seguridad:
      • Formulario de inicio de sesión con validación de formato de correo.
      • Medidor dinámico de robustez de contraseña (longitud, mayúsculas, minúsculas, números, caracteres especiales).
      • Bloqueo temporal por 5 minutos tras 3 intentos fallidos con cronómetro descendente.
      • Modal y verificación de CAPTCHA interactivo.
      • Registro de nuevos usuarios con todos los campos requeridos y validación de coincidencia de contraseñas.
  4. Módulo de Perfil de Usuario:
      • Consulta y actualización de datos personales (nombres, apellidos, documento, fecha de nacimiento, correo).
      • Cambio de contraseña seguro con validación de contraseña actual y confirmación de la nueva.
      • Eliminación de cuenta con doble confirmación.
  5. Panel Administrativo Integral (Rol ADMIN):
      • CRUD completo de Usuarios: listado tabular, creación, edición y eliminación; modal de seguridad cuando un
      administrador edita sus propias credenciales o las de otro administrador.
      • CRUD completo de Eventos: listado visual tipo tarjetas, formulario con selectores relacionales de Categoría y
      Lugar, control de estado y fechas.
      • CRUD completo de Categorías: listado tabular con acciones de edición en línea y eliminación.
      • CRUD completo de Lugares: listado tabular, prevención de duplicados por nombre y dirección, gestión de
      coordenadas y datos de contacto.
  6. Módulos de Usuario Final (Favoritos, Agenda y Notificaciones):
      • Sistema de marcado y desmarcado de favoritos.
      • Planificador de agenda personal con notas.
      • Contador de notificaciones con insignias numéricas sincronizadas en el Cascarón (Header, Drawer, BottomNav,
      Footer).

  ──────
  ## 9. Requisitos faltantes, dudas y decisiones que debe confirmar

  Para asegurar que la arquitectura de la nueva aplicación React sea óptima, le planteo las siguientes decisiones
  clave:

  1. Persistencia de Favoritos, Agenda y Notificaciones:
      • Situación: En el backend actual no hay endpoints para estas entidades, pero las tablas sí existen en MySQL.
      • Decisión a confirmar: ¿Desea que la nueva aplicación React las mantenga en localStorage (como funcionaba
      originalmente el frontend) o prefiere que en una etapa posterior del backend se creen los endpoints REST para
      persistirlos en MySQL?
  2. Manejo de Autenticación en la nueva aplicación React:
      • Situación: Actualmente Spring Boot utiliza cookies de sesión JSESSIONID y el frontend guarda un JSON en
      localStorage.
      • Decisión a confirmar: ¿Mantendremos la autenticación con cookies HttpOnly/sesión de Spring Boot con proxy en
      Vite, o prefiere preparar la arquitectura del cliente con soporte desacoplado para tokens JWT / Bearer?
  3. Destino de las páginas faltantes (favorites.html, agenda.html, notifications.html):
      • Situación: En el proyecto original los enlaces daban 404.
      • Decisión a confirmar: En la nueva SPA de React podemos construir las páginas completas de Favoritos, Mi
      Agenda y Notificaciones reutilizando el estado de la aplicación. ¿Desea que se implementen estas 3 vistas
      completas?
  4. Ubicación de la nueva carpeta del proyecto:
      • Situación: El proyecto original es de estricta lectura en
      C:\Users\Carlos\Documents\NetBeansProjects\culturatech-ev01.
      • Decisión a confirmar: ¿En qué ruta o nombre de carpeta desea crear el nuevo proyecto React? (Por ejemplo:
      C:\Users\Carlos\Documents\NetBeansProjects\culturatech-frontend-react o similar).

  ──────
  ## 10. Propuesta de arquitectura para la nueva aplicación React

  La nueva aplicación será una Single Page Application (SPA) moderna, rápida y mantenible, construida con React 18/19
  y TypeScript o JavaScript moderno (según su preferencia), empaquetada con Vite.

  │ Diagram exceeds terminal width (548 > 119 cols)
  │ Displayed as code block. Widen terminal to view inline.

    flowchart TD
        subgraph AppShell ["Arquitectura de la Aplicación React"]
            Router["React Router (BrowserRouter)"]
            AuthProvider["AuthContext & Provider"]
            AppContext["AppContext (Eventos, Favoritos, Agenda, Avisos)"]
            Layout["MainLayout (Header, Drawer, BottomNav, Footer, Modales)"]

            subgraph RutasPublicas ["Rutas Públicas"]
                LoginView["Login (/login)"]
                RegisterView["Registro (/register)"]
            end

            subgraph RutasProtegidas ["Rutas Autenticadas"]
                HomeView["Inicio (/)"]
                EventsView["Explorar (/events)"]
                DetailView["Detalle Evento (/events/:id)"]
                ProfileView["Perfil (/perfil)"]
                FavView["Favoritos (/favorites)"]
                AgendaView["Agenda (/agenda)"]
                NotifView["Avisos (/notifications)"]
            end

            subgraph RutasAdmin ["Rutas Administrativas (Rol ADMIN)"]
                AdminView["Panel Admin (/admin/*)"]
                AdminUsers["Gestión Usuarios"]
                AdminEvents["Gestión Eventos"]
                AdminCats["Gestión Categorías"]
                AdminPlaces["Gestión Lugares"]
            end
        end

        subgraph CapaServicios ["Capa de Servicios y Red"]
            ApiClient["Axios / Fetch Client (Interceptors, baseURL, error handling)"]
            AuthService["AuthService"]
            EventsService["EventsService"]
            CategoriesService["CategoriesService"]
            PlacesService["PlacesService"]
            UsersService["UsersService"]
        end

        Router --> AuthProvider
        AuthProvider --> AppContext
        AppContext --> Layout
        Layout --> RutasPublicas
        Layout --> RutasProtegidas
        Layout --> RutasAdmin

        HomeView & EventsView & DetailView --> EventsService
        LoginView & RegisterView & ProfileView --> AuthService
        AdminUsers --> UsersService
        AdminEvents --> EventsService
        AdminCats --> CategoriesService
        AdminPlaces --> PlacesService

        AuthService & EventsService & CategoriesService & PlacesService & UsersService --> ApiClient
        ApiClient -- "HTTP / REST" --> BackendAPI["Backend Spring Boot API (:8080)"]
  ──────
  ## 11. Tecnologías recomendadas y justificación de cada elección

  1. Vite + React (JavaScript / TypeScript):
      • Justificación: Tiempos de arranque instantáneos con HMR (Hot Module Replacement), compilación ultra-
      optimizada con Rollup para producción, eliminando los scripts pesados en el navegador.
  2. React Router v6:
      • Justificación: Manejo profesional de rutas protegidas mediante ProtectedRoute, redirección inteligente según
      estado de autenticación y preservación fluida del historial de navegación sin recargar el navegador.
  3. Tailwind CSS v3 (Nativo vía PostCSS):
      • Justificación: Reemplaza el CDN en tiempo de ejecución. Permite purgar todas las clases no utilizadas,
      dejando un archivo CSS final minúsculo (aprox. 15-25 KB), manteniendo exactamente la misma paleta y diseño
      original.
  4. Context API + Custom Hooks:
      • Justificación: Gestión limpia del estado global sin la sobrecarga ni complejidad de Redux. Facilita compartir
      el usuario, la agenda, los favoritos y las alertas entre componentes desacoplados.
  5. Axios o Fetch API wrapper con cliente tipado:
      • Justificación: Centralización de cabeceras, interceptación unificada de respuestas 401 (para redirigir
      automáticamente al login) y manejo consistente de errores de red.
  6. Lucide React o Material Symbols (optimizado):
      • Justificación: Carga de iconos SVG vectoriales sin dependencias de fuentes externas pesadas.

  ──────
  ## 12. Estructura de carpetas propuesta para el nuevo proyecto

    culturatech-frontend-react/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── public/
    │   ├── favicon.ico
    │   └── assets/
    │       └── images/
    │           ├── logo_CulturaTechBG.png
    │           ├── logo_CulturaTechBG.ico
    │           └── login_bogota.png
    └── src/
        ├── main.jsx                     # Punto de entrada de la aplicación
        ├── App.jsx                      # Configuración de React Router y Providers
        ├── index.css                    # Directivas de Tailwind y estilos globales
        ├── assets/                      # Estilos auxiliares e imágenes locales
        ├── api/                         # Configuración del cliente HTTP
        │   ├── apiClient.js             # Instancia con baseURL y manejo de errores
        │   ├── auth.service.js          # Llamadas a /api/auth/*
        │   ├── events.service.js        # Llamadas a /api/eventos/*
        │   ├── categories.service.js    # Llamadas a /api/categorias/*
        │   ├── places.service.js        # Llamadas a /api/lugares/*
        │   └── users.service.js         # Llamadas a /api/usuarios/*
        ├── context/                     # Estado global de la aplicación
        │   ├── AuthContext.jsx          # Sesión, usuario autenticado, login, logout
        │   └── AppContext.jsx           # Favoritos, agenda, notificaciones, filtros
        ├── hooks/                       # Custom hooks reutilizables
        │   ├── useAuth.js               # Acceso rápido al contexto de autenticación
        │   ├── useEvents.js             # Lógica de carga y filtrado de eventos
        │   └── useLockout.js            # Lógica del bloqueo por intentos fallidos
        ├── components/                  # Componentes reutilizables
        │   ├── common/                  # Botones, inputs, badges, loaders, modales
        │   │   ├── Button.jsx
        │   │   ├── Input.jsx
        │   │   ├── Modal.jsx
        │   │   ├── Logo.jsx
        │   │   └── CaptchaBox.jsx
        │   ├── layout/                  # Cascarón común de la UI
        │   │   ├── MainLayout.jsx
        │   │   ├── Header.jsx
        │   │   ├── Drawer.jsx
        │   │   ├── BottomNav.jsx
        │   │   ├── Footer.jsx
        │   │   └── SearchModal.jsx
        │   └── events/                  # Componentes del dominio de eventos
        │       ├── EventCard.jsx
        │       ├── EventCarousel.jsx
        │       └── CategorySelector.jsx
        ├── views/                       # Vistas principales de la aplicación
        │   ├── HomeView.jsx             # Vista de Inicio
        │   ├── EventsView.jsx           # Explorar eventos
        │   ├── EventDetailView.jsx      # Detalle de evento
        │   ├── LoginView.jsx            # Inicio de sesión
        │   ├── RegisterView.jsx         # Registro
        │   ├── ProfileView.jsx          # Perfil de usuario
        │   ├── FavoritesView.jsx        # Favoritos
        │   ├── AgendaView.jsx           # Agenda personal
        │   └── admin/                   # Vistas administrativas
        │       ├── AdminLayout.jsx
        │       ├── AdminUsersTab.jsx
        │       ├── AdminEventsTab.jsx
        │       ├── AdminCategoriesTab.jsx
        │       └── AdminPlacesTab.jsx
        └── utils/                       # Utilidades de formato y validación
            ├── formatters.js            # Fechas y moneda colombiana ($ COP)
            ├── validators.js            # Validación de correo y seguridad de clave
            └── constants.js             # Colores, categorías fijas y rutas
  ──────
  ## 13. Plan de migración por etapas

 | Etapa | Nombre de la Etapa | Objetivos Principales | Dependencias | Criterio de Aceptación |
|---:|---|---|---|---|
| 1 | Inicialización del Entorno | Crear el proyecto Vite en una carpeta independiente, configurar Tailwind con la paleta exacta de CulturaTech, fuentes de Google y assets de imágenes. | Ninguna | Servidor de desarrollo levantado en `http://localhost:5173`, mostrando los estilos y fuentes correctos sin advertencias. |
| 2 | Capa de Servicios y Red | Configurar el cliente HTTP, el proxy de desarrollo para conectar con Spring Boot (`:8080`) y los servicios de API (auth, events, categories, places, users). | Etapa 1 | Pruebas de conectividad exitosas con los endpoints de Spring Boot sin errores de CORS. |
| 3 | Contextos y Cascarón (UI Shell) | Implementar `AuthContext`, `AppContext` y los componentes de maquetación: Header, Drawer, BottomNav, Footer, SearchModal y MainLayout. | Etapa 2 | Navegación responsive funcional; Drawer y BottomNav abriendo fluidamente con badges sincronizados. |
| 4 | Autenticación y Registro | Implementar `LoginView` (con medidor de fortaleza, bloqueo temporal de 5 minutos y CAPTCHA) y `RegisterView` (con validaciones). | Etapa 3 | Inicio de sesión real contra `/api/auth/login`, persistencia del usuario y registro de nuevas cuentas en la base de datos. |
| 5 | Home y Catálogo de Eventos | Implementar `HomeView` (carrusel destacado y categorías), `EventsView` (filtros combinados y paginación) y `EventCard`. | Etapa 4 | Carga reactiva de eventos desde `/api/eventos`, filtrado instantáneo por texto, categoría y fecha. |
| 6 | Ficha de Detalle y Vistas de Usuario | Implementar `EventDetailView`, `ProfileView` (datos y cambio de clave con modal), y las vistas de `FavoritesView` y `AgendaView`. | Etapa 5 | Detalle cargado por ID en la URL, cambio de clave funcional y favoritos/agenda actualizables en vivo. |
| 7 | Panel Administrativo (CRUDs) | Implementar `AdminLayout` con las cuatro pestañas: Usuarios, Eventos, Categorías y Lugares, con modales de seguridad y formularios de edición. | Etapa 6 | Creación, edición y eliminación de registros funcionando contra la API para usuarios con rol ADMIN. |
| 8 | Auditoría Final y Optimización | Pruebas de regresión, verificación del diseño responsive, accesibilidad y generación del bundle de producción optimizado (`vite build`). | Etapa 7 | Compilación de producción sin errores ni advertencias, verificación de la paridad funcional con el proyecto original. |
  ──────
  ## 14. Estrategia de pruebas y verificación

  Para verificar de forma objetiva que la nueva aplicación conserva todas las funcionalidades y reglas de negocio del
  proyecto original, se aplicará la siguiente lista de comprobaciones:

  1. Pruebas de Autenticación y Seguridad:
      • Intentar ingresar con credenciales erróneas y verificar que al tercer fallo se active el bloqueo con cuenta
      regresiva de 5:00 minutos.
      • Probar el medidor de contraseña verificando que pase de "Débil" a "Media" y a "Fuerte" conforme se completan
      los 5 criterios.
      • Validar que un usuario sin rol ADMIN no pueda visualizar ni navegar al panel administrativo.
  2. Pruebas de Catálogo y Búsqueda:
      • Comprobar que el carrusel de inicio ordene y seleccione automáticamente los 3 eventos futuros más próximos.
      • Realizar búsquedas parciales en el modal y en la vista de eventos comprobando coincidencia en título, lugar,
      localidad y descripción.
      • Validar que el formato de moneda muestre Entrada Libre cuando el costo sea 0 y $XX.XXX COP con separador de
      miles colombiano para valores positivos.
  3. Pruebas de Operaciones CRUD en Panel Administrativo:
      • Crear un nuevo lugar y verificar que si se intenta ingresar el mismo nombre y dirección normalizados, el
      sistema rechace el duplicado.
      • Modificar un evento y verificar que los selectores desplegables carguen correctamente la categoría y el lugar
      existentes.
      • Comprobar que al modificar a otro administrador se solicite la contraseña de seguridad del administrador en
      sesión.
  4. Pruebas de Experiencia Responsive y Navegación:
      • Probar en viewport móvil (375px), tableta (768px) y escritorio (1280px), verificando que la transición entre
      BottomNav, navegación de pie de página y Header funcione sin solapamientos ni desbordamientos horizontales.

  ──────
  │ Note
  │ Fin del Informe de Auditoría (Fase 1 y 2).
  │ De acuerdo con los principios obligatorios de la FASE 3, me detengo aquí y quedo a la espera de sus observaciones,
  │ respuestas a las decisiones técnicas de la sección 9 y su aprobación expresa para iniciar juntos el paso a paso
  de
  │ la migración en una carpeta nueva e independiente.