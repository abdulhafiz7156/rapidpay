import React from "react";
import { useTranslation } from "react-i18next";
import copyBoard from "../../assets/icons/copyBoard.svg";
import "./Details.css";

interface DetailsProps {
    number: string;
    amount: string;
    name: string;
    bankName: string;
    currency: string;
    bankLogo: string; // Новый пропс для логотипа банка
}

const Details: React.FC<DetailsProps> = ({ number, amount, name, bankName, currency, bankLogo }) => {
    const { t } = useTranslation();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(number).then(() => {
            console.log("Copied to clipboard");
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    };

    return (
        <div className="details-block flex py-1.5 px-2.5 flex-col text-lightText dark:text-darkText justify-between bg-lightBackground dark:bg-darkBackgroundBlocks rounded-lg my-5 gap-2 w-full">
            {/* Детали транзакции */}
            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <p>{t('mainBlock.details.detailsTransaction')}</p>
                    <p>{number}</p>
                </div>
                <div onClick={copyToClipboard} className="cursor-pointer copy__board rounded-lg p-2 w-fit h-fit">
                    <img src={copyBoard} alt="Icon to copy" />
                </div>
            </div>

            {/* Сумма */}
            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <p>{t('mainBlock.details.sum')}</p>
                    <p>{amount} {currency}</p>
                </div>
                <div onClick={copyToClipboard} className="cursor-pointer copy__board rounded-lg p-2 w-fit h-fit">
                    <img src={copyBoard} alt="Icon to copy" />
                </div>
            </div>

            {/* Имя получателя */}
            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <p>{t('mainBlock.details.name')}</p>
                    <p>{name}</p>
                </div>
            </div>

            {/* Логотип банка и название */}
            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <p>{t('mainBlock.details.bankName')}</p>
                    <div className="flex">
                        <img src={bankLogo} alt="Лого банка" />
                        <p className="ml-2">{bankName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
