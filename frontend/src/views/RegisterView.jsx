/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import PasswordStrengthMeter from '../components/common/PasswordStrengthMeter';
import { usersService } from '../api/users.service';

export default function RegisterView() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    lastname: '',
    cedula: '',
    birthdate: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmailFormat = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isEmailValid = validateEmailFormat(form.email);

  const reqLen = form.password.length >= 8;
  const reqUpper = /[A-Z]/.test(form.password);
  const reqLower = /[a-z]/.test(form.password);
  const reqNum = /[0-9]/.test(form.password);
  const reqSpec = /[@#$!()?&%]/.test(form.password);
  const allReqsMet = reqLen && reqUpper && reqLower && reqNum && reqSpec;

  const passwordsMatch =
    form.password === form.confirmPassword &&
    form.confirmPassword.length > 0;

  const isFormValid =
    form.name.trim().length > 0 &&
    form.lastname.trim().length > 0 &&
    form.cedula.trim().length > 0 &&
    form.birthdate.length > 0 &&
    isEmailValid &&
    allReqsMet &&
    passwordsMatch &&
    form.acceptedTerms &&
    !loading;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const nuevoUsuario = {
        nombres: form.name.trim(),
        apellidos: form.lastname.trim(),
        documento: form.cedula.trim(),
        fechaNacimiento: form.birthdate,
        correo: form.email.trim(),
        contrasena: form.password,
        rol: 'USER',
      };

      await usersService.create(nuevoUsuario);

      setSuccessMessage(
        '¡Cuenta creada exitosamente! Redirigiendo al inicio de sesión...'
      );

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setErrorMessage(err.message || 'No fue posible completar el registro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cremlg flex flex-col items-center">
      {/* Encabezado institucional */}
      <header className="w-full sticky top-0 bg-crem border-b border-darkgr-30 flex items-center justify-between px-4 md:px-10 h-20 z-40 shadow-sm">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <Logo size="sm" showText={true} titleText="CulturaTech Bogotá" />
        </Link>
        <Link
          to="/login"
          className="text-[#8e4e14] font-label font-medium hover:text-[#0d1b2a] underline underline-offset-4 cursor-pointer text-sm"
        >
          Iniciar sesión
        </Link>
      </header>

      {/* Contenido principal en 2 columnas */}
      <main className="flex-grow w-full max-w-[1280px] px-4 md:px-10 py-8 md:py-12 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full items-center">
          {/* Columna izquierda: imagen y narrativa */}
          <div className="hidden lg:flex flex-col gap-6">
            <h1 className="font-display font-bold text-4xl txt-darkbln leading-tight">
              Descubre la vibrante esencia cultural de Bogotá.
            </h1>
            <p className="font-body text-base txt-primary max-w-md">
              Regístrate para acceder a convocatorias exclusivas, guardar tus
              eventos favoritos y explorar la agenda cultural más completa de
              la capital.
            </p>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-darkgr-30">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMUJokjth6XPDP-qw7WKSyUh7pno2SfSi9Pt0ifGcV5VWqHq7WdCmhTb54JLrbtCz_wj-tGXR-Gp87MvRa-MyuPC7RI-GfBUm_SEcvZ5xnwNjElZy5JnK_mDMF3w2oAk3cEDJrCKegr2WHI-bEsKQjkZqKghnCBW1R1y7y5FsYP-NJSCtNHyzGEtLUa_ExjSbx-poYxv34ta_opBL3R5208M1J4nIX1JhFohcB6PYCT6AnrIjesSjeCzpV2YPeTPWeIYcWKdW70FU"
                alt="Cultura Bogotá"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c2c]/40 to-transparent" />
            </div>
          </div>

          {/* Columna derecha: tarjeta de formulario */}
          <div className="w-full max-w-lg mx-auto">
            <div className="bg-white p-6 md:p-10 rounded-2xl border border-darkgr-40 shadow-xl">
              <div className="mb-6 text-center md:text-left">
                <h2 className="font-display text-2xl md:text-3xl font-bold txt-darkbln mb-1">
                  Crear Cuenta
                </h2>
                <p className="font-body text-xs md:text-sm txt-primary">
                  Regístrate para continuar en la plataforma
                </p>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-red-600">
                    error
                  </span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 text-green-800 border border-green-200 rounded-xl text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-green-600">
                    check_circle
                  </span>
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Nombres y apellidos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label text-xs font-medium txt-main">
                      Nombres
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Ej: Juan"
                      className="w-full bg-crem border border-darkgr-40 rounded-lg px-4 py-3 font-body text-sm outline-none focus:border-[#0f1c2c] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label text-xs font-medium txt-main">
                      Apellidos
                    </label>
                    <input
                      type="text"
                      required
                      value={form.lastname}
                      onChange={(e) => handleChange('lastname', e.target.value)}
                      placeholder="Ej: Pérez"
                      className="w-full bg-crem border border-darkgr-40 rounded-lg px-4 py-3 font-body text-sm outline-none focus:border-[#0f1c2c] transition-all"
                    />
                  </div>
                </div>

                {/* Documento */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label text-xs font-medium txt-main">
                    Documento (Cédula)
                  </label>
                  <input
                    type="text"
                    required
                    value={form.cedula}
                    onChange={(e) => handleChange('cedula', e.target.value)}
                    placeholder="Ej: 1020304050"
                    className="w-full bg-crem border border-darkgr-40 rounded-lg px-4 py-3 font-body text-sm outline-none focus:border-[#0f1c2c] transition-all"
                  />
                </div>

                {/* Fecha de nacimiento */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label text-xs font-medium txt-main">
                    Fecha de Nacimiento
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="date"
                      required
                      value={form.birthdate}
                      onChange={(e) => handleChange('birthdate', e.target.value)}
                      className="w-full bg-crem border border-darkgr-40 rounded-lg pl-4 pr-10 py-3 font-body text-sm outline-none focus:border-[#0f1c2c] transition-all"
                    />
                    <span className="material-symbols-outlined absolute right-3 txt-muted pointer-events-none">
                      calendar_month
                    </span>
                  </div>
                </div>

                {/* Correo electrónico */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label text-xs font-medium txt-main">
                    Correo Electrónico
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 txt-muted">
                      mail
                    </span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="Ej: juan.perez@example.com"
                      className="w-full bg-crem border border-darkgr-40 rounded-lg pl-10 pr-10 py-3 font-body text-sm outline-none focus:border-[#0f1c2c] transition-all"
                    />
                  </div>
                </div>

                {/* Contraseña */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label text-xs font-medium txt-main">
                    Contraseña
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 txt-muted">
                      lock
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={form.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="w-full bg-crem border border-darkgr-40 rounded-lg pl-10 pr-10 py-3 font-body text-sm outline-none focus:border-[#0f1c2c] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 txt-muted hover-txt-darkbl cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>

                  {form.password.length > 0 && (
                    <PasswordStrengthMeter password={form.password} />
                  )}
                </div>

                {/* Confirmar contraseña */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label text-xs font-medium txt-main">
                    Confirmar Contraseña
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 txt-muted">
                      lock_reset
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={form.confirmPassword}
                      onChange={(e) =>
                        handleChange('confirmPassword', e.target.value)
                      }
                      placeholder="Repite tu contraseña"
                      className="w-full bg-crem border border-darkgr-40 rounded-lg pl-10 pr-10 py-3 font-body text-sm outline-none focus:border-[#0f1c2c] transition-all"
                    />
                  </div>
                  {form.confirmPassword.length > 0 && !passwordsMatch && (
                    <span className="text-[11px] text-red-600 font-label ml-2">
                      Las contraseñas no coinciden.
                    </span>
                  )}
                </div>

                {/* Términos y condiciones */}
                <div className="flex items-start gap-3 mt-2">
                  <input
                    type="checkbox"
                    id="reg-terms"
                    required
                    checked={form.acceptedTerms}
                    onChange={(e) =>
                      handleChange('acceptedTerms', e.target.checked)
                    }
                    className="mt-1 w-5 h-5 rounded br-darkgr text-[#0f1c2c] cursor-pointer"
                  />
                  <label
                    htmlFor="reg-terms"
                    className="font-body text-xs txt-primary leading-relaxed cursor-pointer"
                  >
                    Acepto los{' '}
                    <span className="txt-darkbln font-semibold hover:underline">
                      Términos y Condiciones
                    </span>{' '}
                    y la{' '}
                    <span className="txt-darkbln font-semibold hover:underline">
                      Política de Privacidad
                    </span>
                    .
                  </label>
                </div>

                {/* Botón registrarse */}
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full font-body font-medium py-3.5 px-6 rounded-lg shadow-sm transition-all mt-4 ${
                    isFormValid
                      ? 'bg-darkbl hover:bg-black text-white cursor-pointer active:scale-95'
                      : 'bg-soft txt-muted cursor-not-allowed'
                  }`}
                >
                  {loading ? 'Creando cuenta...' : 'Registrarse'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="font-body text-xs txt-primary">
                  ¿Ya tienes una cuenta?
                  <Link
                    to="/login"
                    className="txt-darkbln font-bold hover:underline ml-1 cursor-pointer no-underline"
                  >
                    Iniciar Sesión
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Pie de página institucional */}
      <footer className="w-full py-6 px-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-darkgr-30 bg-crem txt-primary font-label text-xs">
        <span>
          Explora la cultura digital con CulturaTech Bogotá. Conectando mentes
          creativas.
        </span>
        <span>
          © 2026 CulturaTech Bogotá. Todos los derechos reservados. ADSO SENA
        </span>
      </footer>
    </div>
  );
}
