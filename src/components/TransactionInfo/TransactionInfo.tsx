import React from "react";
import copyBoard from "../../assets/icons/copyBoard.svg"
import {t} from "i18next";

interface TransactionInfoProps {
    id: string;
    amount: string;
    currency: string;
}

const TransactionInfo: React.FC<TransactionInfoProps> = ({ id, amount, currency }) => {
    return (
        <div className="transaction-info flex py-1.5 px-2.5 items-center text-lightText dark:text-darkText justify-between bg-lightBackground dark:bg-darkBackgroundBlocks rounded-lg mb-5 gap-2 w-full">
            <div>
                <h6 className="text-xs">{t('mainBlock.payingBill')}</h6>
                <div>
                    <p>{t('mainBlock.idTransaction')}</p>
                </div>
                <div className="flex gap-2">
                    <h6 className="text-xs">{id}</h6>
                    <img src={copyBoard} alt="copyBoard icon" width="12px" height="12px"/>
                </div>
            </div>
            <div>
                {amount} {currency}
            </div>
        </div>
    );
};

export default TransactionInfo;
