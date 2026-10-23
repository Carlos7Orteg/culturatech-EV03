/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
export default function Logo( {
size = 'md',
        showText = true,
        titleText = 'CulturaTech Bogotá',
        variant = 'light',
        className = '',
}) {
    const sizeMap = {
        sm: {img: 'w-11 h-11 rounded-lg p-0.5', text: 'text-base md:text-lg'},
        md: {img: 'w-12 h-12 rounded-xl p-1', text: 'text-xl md:text-2xl'},
        lg: {img: 'w-20 h-20 rounded-2xl p-1.5', text: 'text-2xl md:text-3xl'},
        xl: {img: 'w-28 h-28 rounded-2xl p-2', text: 'text-3xl md:text-4xl'},
    };

    const currentSize = sizeMap[size] || sizeMap.md;

    const defaultBg =
            variant === 'dark'
            ? 'bg-lightbl border border-white/15 shadow-sm'
            : variant === 'transparent'
            ? 'bg-transparent border-0'
            : 'bg-white border border-darkgr-40 shadow-sm';

    const defaultTextColor = variant === 'dark' ? 'text-white' : 'txt-darkbl';

    return (
            <div className={`flex items-center gap-2.5 select-none ${className}`}>
                <div
                    className={`${currentSize.img} overflow-hidden flex-shrink-0 flex items-center justify-center transition-
  all ${defaultBg}`}
                    >
                    <img
                        src="/assets/images/logo_CulturaTechBG.png"
                        alt="CulturaTech Bogotá Logo"
                        className="w-full h-full object-contain rounded-md"
                        />
                </div>
                {showText && (
                                    <span className={`font-display font-bold tracking-tight ${defaultTextColor} ${currentSize.text}`}>
                                        {titleText}
                                    </span>
                                    )}
            </div>
            );
}
