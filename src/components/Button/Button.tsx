import React, { useContext } from 'react';
import { ThemeContext } from '../../providers/ThemeProvider.tsx';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'filled' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ variant = 'filled', className, children, ...props }) => {
    // Проверка на существование контекста
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error('Button must be used within a ThemeProvider');
    }

    const { isDarkMode } = themeContext;

    const baseClasses = 'px-4 py-2 rounded focus:outline-none w-full rounded-lg active:bg-defaultActiveBlue';

    const variantClasses = variant === 'filled'
        ? 'bg-defaultBlue text-white'
        : `bg-transparent border border-defaultBlue ${isDarkMode ? 'text-white' : 'text-black'}`;

    return (
        <button
            className={`${baseClasses} ${variantClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
