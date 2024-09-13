import React, { useContext } from 'react';
import { ThemeContext } from '../../providers/ThemeProvider.tsx'; // Импортируем ThemeContext

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'filled' | 'outline'; // Определяет стиль кнопки
}

const Button: React.FC<ButtonProps> = ({ variant = 'filled', className, children, ...props }) => {
    const { isDarkMode } = useContext(ThemeContext); // Получаем текущую тему из контекста

    // Определяем базовые классы
    const baseClasses = 'px-4 py-2 rounded focus:outline-none w-full';

    // Определяем классы в зависимости от варианта кнопки и темы
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
