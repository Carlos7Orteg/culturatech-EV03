/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import PasswordStrengthMeter from '../components/common/PasswordStrengthMeter';
import CaptchaModal from '../components/common/CaptchaModal';
import { useAuth } from '../context/AuthContext';
export default function LoginView() {
    const navigate = useNavigate();
    const {login, user} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [captchaChecked, setCaptchaChecked] = useState(false);
    const [showCaptchaModal, setShowCaptchaModal] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotSent, setForgotSent] = useState(false);
    const [socialNotice, setSocialNotice] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    // Estados de bloqueo por fuerza bruta (5 minutos)
    const [failedAttempts, setFailedAttempts] = useState(() => {
        return parseInt(localStorage.getItem('culturatech_failed_attempts') || '0', 10);
    });
    const [lockoutUntil, setLockoutUntil] = useState(() => {
        const stored = localStorage.getItem('culturatech_lockout_until');
        return stored ? parseInt(stored, 10) : null;
    });
    const [timeLeftMs, setTimeLeftMs] = useState(0);
    // Redirigir a Home si el usuario ya está autenticado
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);
    // Manejo del cronómetro descendente de bloqueo
    useEffect(() => {
        if (!lockoutUntil)
            return;
        const interval = setInterval(() => {
            const remaining = lockoutUntil - Date.now();
            if (remaining <= 0) {
                setLockoutUntil(null);
                setFailedAttempts(0);
                setTimeLeftMs(0);
                localStorage.removeItem('culturatech_lockout_until');
                localStorage.setItem('culturatech_failed_attempts', '0');
                clearInterval(interval);
            } else {
                setTimeLeftMs(remaining);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [lockoutUntil]);
    const isLocked = lockoutUntil !== null && Date.now() < lockoutUntil;
    const validateEmailFormat = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const isEmailValid = validateEmailFormat(email);
    // Evaluación de los 5 requisitos de contraseña
    const reqLen = password.length >= 8;
    const reqUpper = /[A-Z]/.test(password);
    const reqLower = /[a-z]/.test(password);
    const reqNum = /[0-9]/.test(password);
    const reqSpec = /[@#$!()?&%]/.test(password);
    const allReqsMet = reqLen && reqUpper && reqLower && reqNum && reqSpec;
    const isFormValid =
            email.trim().length > 0 &&
            isEmailValid &&
            allReqsMet &&
            captchaChecked &&
            !isLocked &&
            !loading;
    const formatCountdown = (ms) => {
        const totalSec = Math.ceil(ms / 1000);
        const min = Math.floor(totalSec / 60);
        const sec = totalSec % 60;
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid)
            return;
        setLoading(true);
        setErrorMessage('');
        const res = await login({correo: email.trim(), contrasena: password});
        if (res.ok) {
            localStorage.setItem('culturatech_failed_attempts', '0');
            localStorage.removeItem('culturatech_lockout_until');
            navigate('/');
        } else {
            const newAttempts = failedAttempts + 1;
            setFailedAttempts(newAttempts);
            localStorage.setItem('culturatech_failed_attempts', newAttempts.toString());
            if (newAttempts >= 3) {
                const lockoutTime = Date.now() + 5 * 60 * 1000;
                setLockoutUntil(lockoutTime);
                setTimeLeftMs(5 * 60 * 1000);
                localStorage.setItem('culturatech_lockout_until', lockoutTime.toString());
            } else {
                setErrorMessage(res.mensaje || 'El correo electrónico o la contraseña no son correctos.');
            }
        }
        setLoading(false);
    };
    const showSocialAlert = (provider) => {
        setSocialNotice(`El inicio de sesión con ${provider} estará disponible próximamente.`);
        setTimeout(() => setSocialNotice(null), 4000);
    };
    return (
                 <div className="min-h-screen flex items-center justify-center p-4 md:p-10 relative bg-cover bg-center bg-no-repeat login-background" 
                 style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida/AP1WRLtz-1hSh7bGFI6kHCM4A6rmIdLN-t3muX9dLiWprggn - R4VoFBOBk_jJwkuk5Gyx6u8v1V29ulcJlnaqxXCaIafWK3tre1d5d - mPCu5cQHUZpb68F - PrSgjUIBJaWfW_8qXZPsp74DAEDcIoDOZmnkGMYPIpU9Nf1ha4ayJWIhJvhsW3e_H2ocYBgyCJwwmXCcWNFFQLgmUew7Ru5rNtb7qlJJO2qZpm3 - YyrYM6b4_sZOvl0CtQ7Ns824')",
                             }}
                 >
                <div className="absolute inset-0 bg-darkbl-80 z-0" />
                <main className="w-full max-w-[440px] flex flex-col items-center gap-4 z-10 relative">
                    <div className="w-full bg-cremlg shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col gap-5
                         relative overflow-hidden border border-darkgr-40">
            
                        {/* Cabecera del formulario */}
                        <div className="flex flex-col items-center gap-2 mb-1">
                            <Logo size="lg" showText={false} />
                            <h1 className="font-display font-bold text-2xl md:text-3xl txt-darkbl text-center mt-2">
                                App Cultura Bogotá
                            </h1>
                            <p className="font-body text-xs md:text-sm txt-primary text-center max-w-[320px]">
                                Explora la cultura, el arte y los eventos más destacados de Bogotá
                            </p>
                        </div>
            
                        {/* Bloque de Bloqueo por Fuerza Bruta */}
                        {isLocked && (
                                 <div className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-red-
                                      50 border border-red-300 mb-2 text-center animate-fadeIn">
                                     <span className="material-symbols-outlined text-red-600 text-[40px]">lock</span>
                                     <h3 className="font-display text-base font-bold text-red-900">
                                         Acceso bloqueado temporalmente
                                     </h3>
                                     <p className="font-body text-xs text-red-800">
                                         Se alcanzó el número máximo de intentos. Intenta nuevamente en unos minutos.
                                     </p>
                                     <div className="mt-2 font-label text-xs font-bold text-red-700 bg-white/80 px-4 py-1.5
                                          rounded-full border border-red-200">
                                         Puedes volver a intentarlo en: {formatCountdown(timeLeftMs)}
                                     </div>
                                 </div>
                             )}
            
                        {/* Error de credenciales incorrectas */}
                        {errorMessage && !isLocked && (
                                 <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50 text-red-900 border
                                      border-red-200 text-xs">
                                     <span className="material-symbols-outlined text-red-600 text-lg mt-0.5">error</span>
                                     <div className="flex flex-col">
                                         <span className="font-bold">{errorMessage}</span>
                                         <span className="text-red-700 mt-0.5">
                                             Te quedan {Math.max(0, 3 - failedAttempts)} intento(s).
                                         </span>
                                     </div>
                                 </div>
                             )}
            
                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
                            {/* Campo Correo */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="login-email" className="font-label text-xs txt-main ml-4 font-medium">
                                    Correo Electrónico
                                </label>
                                <div
                                    className={`relative flex items-center rounded-full bg-crem border transition-all ${
                                                     isLocked ? 'opacity-60 cursor-not-allowed border-darkgr-40' : ''
                                                     } ${
                                                     emailTouched && email.length > 0
                                                     ? isEmailValid
                                                     ? 'border-green-600 focus-within:ring-1 focus-within:ring-green-600'
                                                     : 'border-red-600 focus-within:ring-1 focus-within:ring-red-600'
                             : 'border-darkgr-40 focus-within:border-[#0d1b2a]'
                             }`}
                                    >
                                    <span className="material-symbols-outlined absolute left-4 txt-muted text-[20px]">
                                        mail
                                    </span>
                                    <input
                                        id="login-email"
                                        type="email"
                                        disabled={isLocked}
                                        value={email}
                                        onChange={(e) => {
                                                     setEmail(e.target.value);
                         setEmailTouched(true);
                     }}
                                        placeholder="ejemplo@correo.com"
                                        className="w-full pl-11 pr-11 py-3 bg-transparent border-none rounded-full font-
                                        body text-sm outline-none txt-main placeholder-txt-muted"
                                        required
                                        />
                                    {emailTouched && email.length > 0 && isEmailValid && (
                                 <span className="material-symbols-outlined absolute right-4 text-green-600 text-
                                       [20px]">
                                     check_circle
                                 </span>
                             )}
                                </div>
                                {emailTouched && email.length > 0 && !isEmailValid && (
                                 <span className="font-label text-[11px] text-red-600 ml-4">
                                     Ingresa un correo electrónico válido.
                                 </span>
                             )}
                            </div>
            
                            {/* Campo Contraseña */}
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-center px-4">
                                    <label htmlFor="login-password" className="font-label text-xs txt-main font-medium">
                                        Contraseña
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowForgotModal(true)}
                                        className="font-label text-[11px] text-[#8e4e14] hover:underline cursor-pointer"
                                        >
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>
            
                                <div
                                    className={`relative flex items-center rounded-full bg-crem border border-darkgr-40
  transition-all ${
                             isLocked ? 'opacity-60 cursor-not-allowed' : 'focus-within:border-[#0d1b2a]'
                             }`}
                                    >
                                    <span className="material-symbols-outlined absolute left-4 txt-muted text-[20px]">
                                        lock
                                    </span>
                                    <input
                                        id="login-password"
                                        type={showPassword ? 'text' : 'password'}
                                        disabled={isLocked}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Mínimo 8 caracteres"
                                        className="w-full pl-11 pr-12 py-3 bg-transparent border-none rounded-full font-
                                        body text-sm outline-none txt-main placeholder-txt-muted"
                                        required
                                        />
                                    <button
                                        type="button"
                                        disabled={isLocked}
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 txt-muted hover-txt-darkbl transition-colors cursor-
                                        pointer"
                                        >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
            
                                {password.length > 0 && <PasswordStrengthMeter password={password} />}
                            </div>
            
                            {/* Validación CAPTCHA */}
                            <div className="flex flex-col gap-1.5 mt-1">
                                <label className="font-label text-xs txt-main ml-4 font-medium">
                                    Validación de seguridad
                                </label>
                                <div
                                    onClick={() => {
                         if (!isLocked)
                                                     setShowCaptchaModal(true);
                                             }}
                                    className={`flex items-center justify-between p-3.5 border rounded-2xl bg-crem
  transition-colors cursor-pointer ${
                             captchaChecked ? 'border-[#0f1c2c] bg-white' : 'border-darkgr-40'
                             } ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            disabled={isLocked}
                                            checked={captchaChecked}
                                            onChange={(e) => setCaptchaChecked(e.target.checked)}
                                            className="w-5 h-5 rounded br-muted txt-darkbl cursor-pointer"
                                            />
                                        <div className="flex flex-col text-left">
                                            <span className="font-body text-xs txt-main font-medium">
                                                Confirma que eres una persona
                                            </span>
                                            <span className="font-label text-[10px] txt-primary">
                                                Requerido para continuar
                                            </span>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined txt-muted">shield_person</span>
                                </div>
                            </div>
            
                            {/* Botón Ingresar */}
                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className={`w-full font-body font-semibold py-3.5 px-6 rounded-full shadow-md
  transition-all mt-2 ${
                                                 isFormValid
                             ? 'bg-darkbl hover:bg-black text-white cursor-pointer active:scale-95'
                             : 'bg-soft txt-muted cursor-not-allowed'
                             }`}
                                >
                                {loading ? 'Validando...' : 'Ingresar'}
                            </button>
                        </form>
            
                        {/* Notificación Social */}
                        {socialNotice && (
                                         <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-900 border border-
                                              amber-200 rounded-xl text-xs font-label animate-fadeIn">
                                             <span className="material-symbols-outlined text-amber-600 text-sm">info</span>
                                             <span>{socialNotice}</span>
                                         </div>
                                     )}
            
                        {/* Separador */}
                        <div className="flex items-center gap-2 my-1">
                            <div className="h-[1px] flex-1 bg-darkgr-30" />
                            <span className="font-label text-[10px] txt-primary uppercase tracking-widest px-1">
                                o ingresa con
                            </span>
                            <div className="h-[1px] flex-1 bg-darkgr-30" />
                        </div>
            
                        {/* Redes Sociales */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => showSocialAlert('Google')}
                                className="flex-1 flex items-center justify-center py-2.5 border border-darkgr-40
                                rounded-full text-xs font-label txt-primary hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                Google
                            </button>
                            <button
                                type="button"
                                onClick={() => showSocialAlert('Facebook')}
                                className="flex-1 flex items-center justify-center py-2.5 border border-darkgr-40
                                rounded-full text-xs font-label txt-primary hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                Facebook
                            </button>
                        </div>
            
                        {/* Enlace al Registro */}
                        <p className="font-body text-xs txt-main text-center mt-2">
                            ¿Aún no eres parte?
                            <Link
                                to="/register"
                                className="text-[#8e4e14] font-bold ml-1 hover:underline cursor-pointer no-underline"
                                >
                            Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </main>
            
                {/* Modal de CAPTCHA */}
                <CaptchaModal
                    isOpen={showCaptchaModal}
                    isChecked={captchaChecked}
                    onToggle={() => setCaptchaChecked(!captchaChecked)}
                    onConfirm={() => setShowCaptchaModal(false)}
                    onClose={() => setShowCaptchaModal(false)}
                    />
            
                {/* Modal Recuperar Contraseña */}
                {showForgotModal && (
                                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-
                                      fadeIn">
                                     <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4
                                          border border-darkgr-40">
                                         <div className="flex justify-between items-center">
                                             <h3 className="font-display font-bold text-base txt-darkbl">
                                                 Recuperación de Contraseña
                                             </h3>
                                             <button
                                                 onClick={() => {
                                         setShowForgotModal(false);
                                         setForgotSent(false);
                                     }}
                                                 className="p-1 txt-muted hover-txt-darkbl cursor-pointer"
                                                 >
                                                 <span className="material-symbols-outlined text-lg">close</span>
                                             </button>
                                         </div>
                             
                                         {forgotSent ? (
                                                     <div className="flex flex-col items-center gap-3 py-4 text-center animate-fadeIn">
                                                         <span className="material-symbols-outlined text-[48px] text-green-600">
                                                             mark_email_read
                                                         </span>
                                                         <p className="font-body text-sm font-medium txt-main">
                                                             Enlace enviado a tu correo
                                                         </p>
                                                         <p className="font-body text-xs txt-primary">
                                                             Hemos enviado las instrucciones para restablecer tu contraseña a{' '}
                                                             <strong>{forgotEmail}</strong>.
                                                         </p>
                                                         <button
                                                             onClick={() => {
                                                             setShowForgotModal(false);
                                                             setForgotSent(false);
                                                         }}
                                                             className="w-full mt-2 py-2.5 rounded-full bg-darkbl text-white font-label font-
                                                             bold text-xs cursor-pointer hover:bg-black"
                                                             >
                                                             Entendido
                                                         </button>
                                                     </div>
                                             ) : (
                                                     <div className="flex flex-col gap-3">
                                                         <p className="font-body text-xs txt-primary">
                                                             Ingresa tu correo registrado y te enviaremos un enlace de restablecimiento.
                                                         </p>
                                                         <input
                                                             type="email"
                                                             value={forgotEmail}
                                                             onChange={(e) => setForgotEmail(e.target.value)}
                                                             placeholder="ejemplo@correo.com"
                                                             className="w-full bg-crem border border-darkgr-40 rounded-lg px-3 py-2 font-body
                                                             text-sm outline-none focus:border-darkbl"
                                                             />
                                                         <button
                                                             type="button"
                                                             disabled={!validateEmailFormat(forgotEmail)}
                                                             onClick={() => setForgotSent(true)}
                                                             className={`w-full py-2.5 rounded-full font-body font-semibold text-xs mt-2
  transition-all ${
                                                                                     validateEmailFormat(forgotEmail)
                                                                 ? 'bg-darkbl text-white hover:bg-black cursor-pointer'
                                                                 : 'bg-soft txt-muted cursor-not-allowed'
                                                                 }`}
                                                             >
                                                             Enviar enlace de recuperación
                                                         </button>
                                                     </div>
                                                 )}
                                     </div>
                                 </div>
                             )}
            </div>
            );
}
