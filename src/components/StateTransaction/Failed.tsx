import React from "react";
import Button from "../Button/Button.tsx";
import { t } from "i18next";

const Failed: React.FC = () => {
    return (
        <div className="flex flex-col h-screen">
            {/* Первый пустой блок - 20% */}
            <div className="h-[20%]"></div>

            {/* Основной контент - 50% */}
            <div className="h-[50%] flex flex-col items-center justify-center text-lightText dark:text-darkText bg-lightBackground dark:bg-darkBackgroundBlocks rounded-lg p-6 text-center">
                {/* Картинка для светлой темы */}
                <img
                    src="/src/assets/canceled.png"
                    alt="Success"
                    className="mb-4 dark:hidden"
                />
                {/* Картинка для тёмной темы */}
                <img
                    src="/src/assets/canceled.png"
                    alt="Success"
                    className="mb-4 hidden dark:block"
                />

                <h3 className="text-lg font-bold mb-2">{t('mainBlock.stateTransaction.paymentCanceled')}</h3>
                <p className="text-sm mb-4 text-greyTextColor">
                    {t('mainBlock.stateTransaction.paymentCanceledDesc')}
                </p>
            </div>

            {/* Второй пустой блок - 20% */}
            <div className="h-[20%]"></div>

            {/* Блок для кнопки - 10% */}
            <div className="h-[10%] flex items-center justify-center">
                <Button>{t('mainBlock.buttons.backToSite')}</Button>
            </div>
        </div>
    );
};

export default Failed;
