/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
export default function PasswordStrengthMeter({ password = '' }) {
  const reqLen = password.length >= 8;
  const reqUpper = /[A-Z]/.test(password);
  const reqLower = /[a-z]/.test(password);
  const reqNum = /[0-9]/.test(password);
  const reqSpec = /[@#$!()?&%]/.test(password);

  const passedCount = [reqLen, reqUpper, reqLower, reqNum, reqSpec].filter(Boolean).length;

  let strengthLabel = 'Débil';
  let strengthColor = 'text-[#ba1a1a]';

  if (passedCount >= 5) {
    strengthLabel = 'Fuerte';
    strengthColor = 'text-[#146c2e]';
  } else if (passedCount >= 3) {
    strengthLabel = 'Media';
    strengthColor = 'text-[#783d01]';
  }

  const reqItem = (met, label) => (
    <div className={`flex items-center gap-2 ${met ? 'text-[#146c2e]' : 'text-[#ba1a1a]'}`}>
      {met ? (
        <span className="font-bold text-xs">✓</span>
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]" />
      )}
      <span>{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-1.5 px-4 mt-2 bg-crem p-3 rounded-xl border border-darkgr-30">
      <div className="flex items-center justify-between">
        <span className="font-label text-xs font-bold txt-main">
          Requisitos de contraseña
        </span>
        <div className="flex items-center gap-1 font-label text-[11px]">
          <span className="txt-primary">Fortaleza:</span>
          <span className={`font-bold ${strengthColor}`}>{strengthLabel}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1 text-[11px] font-body mt-1">
        {reqItem(reqLen, 'Mínimo 8 caracteres')}
        {reqItem(reqUpper, 'Una letra mayúscula (A-Z)')}
        {reqItem(reqLower, 'Una letra minúscula (a-z)')}
        {reqItem(reqNum, 'Un número (0-9)')}
        {reqItem(reqSpec, 'Un carácter especial (@#$!()?&%)')}
      </div>
    </div>
  );
}