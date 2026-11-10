/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../api/auth.service';
import { useAuth } from '../context/AuthContext';

const initialProfile = {
  nombres: '',
  apellidos: '',
  documento: '',
  fechaNacimiento: '',
  correo: '',
};

const initialPasswords = {
  contrasenaActual: '',
  nuevaContrasena: '',
  confirmarContrasena: '',
};

export default function ProfileView() {
  const navigate = useNavigate();
  const { updateUser, logout } = useAuth();

  const [profile, setProfile] = useState(initialProfile);
  const [passwords, setPasswords] = useState(initialPasswords);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const usuario = await authService.getPerfil();

        setProfile({
          nombres: usuario.nombres || '',
          apellidos: usuario.apellidos || '',
          documento: usuario.documento || '',
          fechaNacimiento: usuario.fechaNacimiento || '',
          correo: usuario.correo || '',
        });

        updateUser(usuario);
      } catch (error) {
        logout();
        navigate('/login', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswords((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setAlert(null);

    try {
      await authService.actualizarDatos(profile);
      updateUser(profile);

      setAlert({
        type: 'success',
        message: 'Tus datos personales se actualizaron correctamente.',
      });
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setAlert(null);

    if (passwords.nuevaContrasena !== passwords.confirmarContrasena) {
      setAlert({
        type: 'error',
        message: 'La nueva contraseña y su confirmación no coinciden.',
      });
      return;
    }

    if (passwords.nuevaContrasena.length < 8) {
      setAlert({
        type: 'error',
        message: 'La nueva contraseña debe tener al menos 8 caracteres.',
      });
      return;
    }

    setChangingPassword(true);

    try {
      await authService.cambiarContrasena(passwords);
      setPasswords(initialPasswords);

      setAlert({
        type: 'success',
        message: 'La contraseña se actualizó correctamente.',
      });
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.message,
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      '¿Deseas eliminar definitivamente tu cuenta? Esta acción no se puede deshacer.'
    );

    if (!confirmed) return;

    setDeleting(true);
    setAlert(null);

    try {
      await authService.eliminarCuenta();
      logout();
      navigate('/login', { replace: true });
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.message,
      });
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="perfil-background">
        <div className="perfil-card text-center">
          Cargando información del perfil...
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-page">
      <div className="perfil-background">
        <div className="perfil-overlay"></div>

        <main className="perfil-wrapper">
          <Link to="/" className="perfil-back">
            <span className="material-symbols-outlined">arrow_back</span>
            Volver al inicio
          </Link>

          <section className="perfil-card">
            <header className="perfil-header">
              <div className="perfil-logo">
                <img
                  src="/assets/images/logo_CulturaTechBG.png"
                  alt="CulturaTech Bogotá"
                />
              </div>

              <div className="perfil-heading">
                <span className="perfil-eyebrow">MI CUENTA</span>
                <h1>Configuración de perfil</h1>
                <p>
                  Administra tu información personal y los datos asociados a
                  tu cuenta.
                </p>
              </div>
            </header>

            {alert && (
              <div
                className={`perfil-alert ${
                  alert.type === 'success'
                    ? 'perfil-alert-success'
                    : 'perfil-alert-error'
                }`}
                role="alert"
              >
                <span className="material-symbols-outlined">
                  {alert.type === 'success' ? 'check_circle' : 'error'}
                </span>
                {alert.message}
              </div>
            )}

            {/* Datos personales */}
            <form className="perfil-form" onSubmit={handleProfileSubmit}>
              <section className="perfil-section">
                <div className="perfil-section-title">
                  <span className="material-symbols-outlined">person</span>
                  <div>
                    <h2>Datos personales</h2>
                    <p>Información asociada a tu cuenta.</p>
                  </div>
                </div>

                <div className="perfil-grid">
                  <div className="perfil-field">
                    <label htmlFor="nombres">Nombres</label>
                    <div className="perfil-input-wrap">
                      <span className="material-symbols-outlined">person</span>
                      <input
                        id="nombres"
                        name="nombres"
                        type="text"
                        value={profile.nombres}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="perfil-field">
                    <label htmlFor="apellidos">Apellidos</label>
                    <div className="perfil-input-wrap">
                      <span className="material-symbols-outlined">badge</span>
                      <input
                        id="apellidos"
                        name="apellidos"
                        type="text"
                        value={profile.apellidos}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="perfil-field">
                    <label htmlFor="documento">Documento</label>
                    <div className="perfil-input-wrap">
                      <span className="material-symbols-outlined">id_card</span>
                      <input
                        id="documento"
                        name="documento"
                        type="text"
                        value={profile.documento}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="perfil-field">
                    <label htmlFor="fechaNacimiento">
                      Fecha de nacimiento
                    </label>
                    <div className="perfil-input-wrap">
                      <span className="material-symbols-outlined">
                        calendar_today
                      </span>
                      <input
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        type="date"
                        value={profile.fechaNacimiento}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="perfil-field perfil-field-full">
                    <label htmlFor="correo">Correo electrónico</label>
                    <div className="perfil-input-wrap">
                      <span className="material-symbols-outlined">mail</span>
                      <input
                        id="correo"
                        name="correo"
                        type="email"
                        value={profile.correo}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="perfil-actions">
                <button
                  type="submit"
                  className="perfil-btn perfil-btn-primary"
                  disabled={saving}
                >
                  <span className="material-symbols-outlined">save</span>
                  {saving ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </form>

            <div className="perfil-divider"></div>

            {/* Seguridad */}
            <form onSubmit={handlePasswordSubmit}>
              <section className="perfil-section">
                <div className="perfil-section-title">
                  <span className="material-symbols-outlined">lock</span>
                  <div>
                    <h2>Seguridad</h2>
                    <p>Actualiza tu contraseña cuando lo necesites.</p>
                  </div>
                </div>

                <div className="perfil-grid">
                  <div className="perfil-field perfil-field-full">
                    <label htmlFor="contrasenaActual">
                      Contraseña actual
                    </label>
                    <div className="perfil-input-wrap">
                      <span className="material-symbols-outlined">lock</span>
                      <input
                        id="contrasenaActual"
                        name="contrasenaActual"
                        type="password"
                        value={passwords.contrasenaActual}
                        onChange={handlePasswordChange}
                        autoComplete="current-password"
                        required
                      />
                    </div>
                  </div>

                  <div className="perfil-field">
                    <label htmlFor="nuevaContrasena">Nueva contraseña</label>
                    <div className="perfil-input-wrap">
                      <span className="material-symbols-outlined">
                        lock_reset
                      </span>
                      <input
                        id="nuevaContrasena"
                        name="nuevaContrasena"
                        type="password"
                        value={passwords.nuevaContrasena}
                        onChange={handlePasswordChange}
                        minLength={8}
                        autoComplete="new-password"
                        required
                      />
                    </div>
                  </div>

                  <div className="perfil-field">
                    <label htmlFor="confirmarContrasena">
                      Confirmar contraseña
                    </label>
                    <div className="perfil-input-wrap">
                      <span className="material-symbols-outlined">
                        lock_reset
                      </span>
                      <input
                        id="confirmarContrasena"
                        name="confirmarContrasena"
                        type="password"
                        value={passwords.confirmarContrasena}
                        onChange={handlePasswordChange}
                        minLength={8}
                        autoComplete="new-password"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="perfil-actions">
                  <button
                    type="submit"
                    className="perfil-btn perfil-btn-primary"
                    disabled={changingPassword}
                  >
                    <span className="material-symbols-outlined">save</span>
                    {changingPassword
                      ? 'Actualizando...'
                      : 'Actualizar contraseña'}
                  </button>
                </div>
              </section>
            </form>

            <div className="perfil-divider"></div>

            {/* Eliminación de cuenta */}
            <section className="perfil-danger">
              <div className="perfil-section-title perfil-danger-title">
                <span className="material-symbols-outlined">warning</span>
                <div>
                  <h2>Zona de cuenta</h2>
                  <p>Esta acción es permanente.</p>
                </div>
              </div>

              <div className="perfil-danger-content">
                <div>
                  <strong>Eliminar cuenta</strong>
                  <p>
                    Elimina tu cuenta y los registros personales relacionados.
                    Esta acción no se puede deshacer.
                  </p>
                </div>

                <button
                  type="button"
                  className="perfil-btn perfil-btn-danger"
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                >
                  <span className="material-symbols-outlined">delete</span>
                  {deleting ? 'Eliminando...' : 'Eliminar cuenta'}
                </button>
              </div>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}