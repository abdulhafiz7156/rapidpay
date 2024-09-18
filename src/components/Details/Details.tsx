import React from "react";
import {useTranslation} from "react-i18next";
import copyBoard from "../../assets/icons/copyBoard.svg"
import vtbLogo from "../../assets/banks/vtb.png"
import "./Details.css"

interface DetailsProps {
    number: string;
    amount: string;
    name: string;
    bankName: string;
    currency: string;
}

const Details: React.FC<DetailsProps> = ({ number, amount, name, bankName, currency }) => {

    const { t } = useTranslation()

    const copyToClipboard = () => {
        navigator.clipboard.writeText(number).then(() => {
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    };

    return (
        <div className="details-block flex py-1.5 px-2.5 flex-col text-lightText dark:text-darkText justify-between bg-lightBackground dark:bg-darkBackgroundBlocks rounded-lg my-5 gap-2">
            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <p>{t('mainBlock.details.detailsTransaction')}</p>
                    <p>{number}</p>
                </div>
                <div onClick={copyToClipboard} className="cursor-pointer copy__board rounded-lg p-2 w-fit h-fit">
                    <img src={copyBoard} alt="Icon to copy"/>
                </div>
            </div>
            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <p>{t('mainBlock.details.sum')}</p>
                    <p>{amount} {currency}</p>
                </div>
                <div onClick={copyToClipboard} className="cursor-pointer copy__board rounded-lg p-2 w-fit h-fit">
                    <img src={copyBoard} alt="Icon to copy"/>
                </div>
            </div>
            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <p>{t('mainBlock.details.name')}</p>
                    <p>{name}</p>
                </div>
            </div>
            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <p>{t('mainBlock.details.bankName')}</p>
                    <div className="flex">
                        <img src={vtbLogo} alt="ВТБ банк"/>
                        <p className="ml-1">{bankName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;
