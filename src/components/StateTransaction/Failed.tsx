import React from "react";
import Button from "../Button/Button.tsx";
import { t } from "i18next";
import canceledLogo from "../../assets/canceled.png"

const Failed: React.FC = () => {
    return (
        <div className="flex flex-col h-screen">
            {/* Первый пустой блок - 20% */}
            <div className="h-[20%]"></div>

            {/* Основной контент - 50% */}
            <div className="h-[50%] flex flex-col items-center justify-center text-lightText dark:text-darkText bg-lightBackground dark:bg-darkBackgroundBlocks rounded-lg p-6 text-center">
                <img
                    src={canceledLogo}
                    alt="Success"
                    className="mb-"
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
