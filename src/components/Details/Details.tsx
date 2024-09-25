import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import copyBoard from "../../assets/icons/copyBoard.svg";
import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import "./Details.css";

interface DetailsProps {
    number: string;
    amount: string;
    name: string;
    bankName: string;
    currency: string;
    bankLogo: string;
}

const Details: React.FC<DetailsProps> = ({ number, amount, name, bankName, currency, bankLogo }) => {
    const { t } = useTranslation();
    const [copyStatus, setCopyStatus] = useState<{ number: 'idle' | 'success' | 'error' | 'loading'; amount: 'idle' | 'success' | 'error' | 'loading' }>({
        number: 'idle',
        amount: 'idle',
    });

    const copyToClipboard = (type: 'number' | 'amount', text: string) => {
        setCopyStatus(prev => ({ ...prev, [type]: 'loading' }));
        navigator.clipboard.writeText(text).then(() => {
            setCopyStatus(prev => ({ ...prev, [type]: 'success' }));
            setTimeout(() => setCopyStatus(prev => ({ ...prev, [type]: 'idle' })), 2000); // Reset after 2 seconds
        }).catch(err => {
            console.error("Failed to copy: ", err);
            setCopyStatus(prev => ({ ...prev, [type]: 'error' }));
            setTimeout(() => setCopyStatus(prev => ({ ...prev, [type]: 'idle' })), 2000); // Reset after 2 seconds
        });
    };

    return (
        <div className="details-block flex py-1.5 px-2.5 flex-col text-lightText dark:text-darkText justify-between bg-lightBackground dark:bg-darkBackgroundBlocks rounded-lg my-5 gap-2 w-full">
            {/* Details */}
            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <p>{t('mainBlock.details.detailsTransaction')}</p>
                    <p>{number}</p>
                </div>
                <div onClick={() => copyToClipboard('number', number)} className="cursor-pointer copy__board rounded-lg p-2 w-fit h-fit">
                    {copyStatus.number === 'loading' ? (
                        <ExclamationCircleIcon className="h-5 w-5 animate-spin" />
                    ) : copyStatus.number === 'success' ? (
                        <CheckIcon className="h-5 w-5" />
                    ) : (
                        <img src={copyBoard} alt="Icon to copy" />
                    )}
                </div>
            </div>

            {/* Amount */}
            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <p>{t('mainBlock.details.sum')}</p>
                    <p>{amount} {currency}</p>
                </div>
                <div onClick={() => copyToClipboard('amount', amount)} className="cursor-pointer copy__board rounded-lg p-2 w-fit h-fit">
                    {copyStatus.amount === 'loading' ? (
                        <ExclamationCircleIcon className="h-5 w-5 animate-spin" />
                    ) : copyStatus.amount === 'success' ? (
                        <CheckIcon className="h-5 w-5" />
                    ) : (
                        <img src={copyBoard} alt="Icon to copy" />
                    )}
                </div>
            </div>

            {/* Recipient Name */}
            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <p>{t('mainBlock.details.name')}</p>
                    <p>{name}</p>
                </div>
            </div>

            {/* Bank Logo and Name */}
            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <p>{t('mainBlock.details.bankName')}</p>
                    <div className="flex items-center">
                        <img src={bankLogo} alt="Bank logo" className="h-6 w-6" />
                        <p className="ml-2">{bankName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
