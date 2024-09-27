import React, { useState } from "react";
import copyBoard from "../../assets/icons/copyBoard.svg";
import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { t } from "i18next";

interface TransactionInfoProps {
    id: string;
    amount: string;
    currency: string;
}

const TransactionInfo: React.FC<TransactionInfoProps> = ({ id, amount, currency }) => {
    const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');

    const copyToClipboard = (text: string) => {
        setCopyStatus('loading');
        navigator.clipboard.writeText(text).then(() => {
            setCopyStatus('success');
            setTimeout(() => setCopyStatus('idle'), 2000); // Reset after 2 seconds
        }).catch(err => {
            console.error("Failed to copy: ", err);
            setCopyStatus('error');
            setTimeout(() => setCopyStatus('idle'), 2000); // Reset after 2 seconds
        });
    };

    return (
        <div className="transaction-info flex py-1.5 px-2.5 items-center text-lightText dark:text-darkText justify-between bg-lightBackground dark:bg-darkBackgroundBlocks rounded-lg mb-5 gap-2 w-full">
            <div>
                <h6 className="text-xs">{t('mainBlock.payingBill')}</h6>
                <div>
                    <p>{t('mainBlock.idTransaction')}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <h6 className="text-xs">{id}</h6>
                    <div
                        onClick={() => copyToClipboard(id)}
                        className="cursor-pointer rounded-lg p-1.5 w-fit h-fit"
                    >
                        {copyStatus === 'loading' ? (
                            <ExclamationCircleIcon className="h-3 w-3 animate-spin" />
                        ) : copyStatus === 'success' ? (
                            <CheckIcon className="h-3 w-3" />
                        ) : (
                            <img src={copyBoard} alt="copyBoard icon" width="12px" height="12px" />
                        )}
                    </div>
                </div>
            </div>
            <div>
                {amount} {currency}
            </div>
        </div>
    );
};

export default TransactionInfo;
