/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
export default function CaptchaModal({ isOpen, isChecked, onToggle, onConfirm, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4 border border-darkgr-40">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-lg txt-darkbl">
            Verificación
          </h3>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 txt-muted hover-txt-darkbl cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          )}
        </div>

        <p className="font-body text-xs txt-primary">
          Por motivos de seguridad, por favor valida el siguiente campo antes de continuar.
        </p>

        <label className="cursor-pointer flex items-center justify-between p-3 border border-darkgr-30 rounded-xl hover-bg-crem transition-colors">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={onToggle}
              className="w-5 h-5 rounded br-muted txt-darkbl cursor-pointer"/>
            <span className="font-body text-sm font-medium txt-main">
              No soy un robot
            </span>
          </div>
          <span className="material-symbols-outlined text-green-700">
            verified_user
          </span>
        </label>

        <button
          onClick={onConfirm}
          disabled={!isChecked}
          className={`w-full py-3 rounded-full font-body font-semibold text-sm transition-all ${
            isChecked
              ? 'bg-darkbl text-white hover:bg-black cursor-pointer'
              : 'bg-soft txt-muted cursor-not-allowed'
          }`}>
          Continuar
        </button>
      </div>
    </div>
  );
}
