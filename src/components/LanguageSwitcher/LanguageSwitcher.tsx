import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import bottomArrow from "../../assets/icons/bottom-arrow.svg";

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsOpen(false); // Закрываем меню после выбора языка
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center bg-transparent border-none text-lightText dark:text-darkText cursor-pointer">
                <span className="text-sm">{i18n.language.toUpperCase()}</span>
                <img src={bottomArrow} alt="Dropdown Icon" className="ml-2 w-4 h-4" />
            </button>
            {isOpen && (
                <ul className="absolute top-full left-0 mt-2 bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText shadow-lg border border-lightText dark:border-darkText rounded-md">
                    <li
                        onClick={() => changeLanguage('ru')}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                        Ru
                    </li>
                    <li
                        onClick={() => changeLanguage('uz')}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                        Uz
                    </li>
                </ul>
            )}
        </div>
    );
};

export default LanguageSwitcher;
