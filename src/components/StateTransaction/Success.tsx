import React from "react";
import { t } from "i18next";
import Button from "../Button/Button.tsx";
import whiteSuccessLogo from "../../assets/success-white.svg"
import SuccessLogo from "../../assets/success.svg"

interface SuccessProps {
    amount: string;
    currency: string;
}

const Success: React.FC<SuccessProps> = ({ amount, currency }) => {
    return (
        <div className="flex flex-col h-screen">
            {/* Первый пустой блок - 30% */}
            <div className="h-[20%]"></div>

            {/* Основной контент - 30% */}
            <div className="h-[50%] flex flex-col items-center justify-center text-lightText dark:text-darkText bg-lightBackground dark:bg-darkBackgroundBlocks rounded-lg p-6 text-center">
                {/* Картинка для светлой темы */}
                <img
                    src={whiteSuccessLogo}
                    alt="Success"
                    className="mb-4 dark:hidden"
                />
                {/* Картинка для тёмной темы */}
                <img
                    src={SuccessLogo}
                    alt="Success"
                    className="mb-4 hidden dark:block"
                />

                <h3 className="text-lg font-bold mb-2">{t('mainBlock.stateTransaction.paymentSucceed')}</h3>
                <p className="text-sm mb-4 text-greyTextColor">
                    {t('mainBlock.stateTransaction.paymentSucceedDesc')}
                </p>
                <h3 className="text-xl font-semibold">
                    {amount} {currency}
                </h3>
            </div>

            {/* Второй пустой блок - 30% */}
            <div className="h-[20%]"></div>

            {/* Блок для кнопки - 10% */}
            <div className="h-[10%] flex items-center justify-center">
                <Button>{t('mainBlock.buttons.backToSite')}</Button>
            </div>
        </div>
    );
};

export default Success;
