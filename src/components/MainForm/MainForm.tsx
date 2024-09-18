import React, {useEffect, useState} from "react";
import MethodBlock from "../MethodBlock/MethodBlock.tsx";
import {useTranslation} from "react-i18next";
import Details from "../Details/Details.tsx";
import TransactionInfo from "../TransactionInfo/TransactionInfo.tsx";
import c2cLogo from "../../assets/methods/plastic-card.png"
import spayLogo from "../../assets/methods/spay.png"
import spbLogo from "../../assets/methods/spb.png"

interface Transaction {
    transactionId: string;
    amount: string;
    number: string;
    name: string;
    bankName: string;
    currency: string;
    method: string;
}

const MainForm: React.FC = () => {
    const { t } = useTranslation();
    const bankName = "Global Bank";
    const [orderData, setOrderData] = useState<Transaction | null>(null);


    useEffect(() => {
        const fetchOrderData = async () => {
            const apiUrl = 'https://rap1dpay.com/api/v2/orders/66097de5725bb';
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const jsonResponse = await response.json();

                // Assuming the relevant data is inside jsonResponse.data
                const data = jsonResponse.data;
                console.log(data)

                setOrderData({
                    transactionId: data.order_id || 'N/A',
                    amount: data.amount || 'N/A',
                    number: data.invoice.address || 'N/A',
                    name: data.invoice.recipient || 'N/A',
                    bankName: data.bankName || 'N/A',
                    currency: data.invoice.method.currency || 'N/A',
                    method: data.invoice.method.code || 'N/A',
                });
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };



        fetchOrderData();
    }, []);

    const getMethodDetails = (method: string) => {
        switch (method.toLowerCase()) {
            case 'c2c':
                return {
                    logo: c2cLogo,
                    title: t('mainBlock.methodCardNumber')
                };
            case 'spay':
                return {
                    logo: spayLogo,
                    title: t('mainBlock.methodSpay')
                };
            case 'spb':
                return {
                    logo: spbLogo,
                    title: t('mainBlock.methodSpb')
                };
            case 'a2a':
                return {
                    title: t('mainBlock.methodAccountNumber')
                };
            default:
                return {
                    title: "Error"
                };
        }
    };


    if (!orderData) {
        return <div className="flex justify-center items-center h-3/4 text-lightText dark:text-darkText">Loading...</div>;
    }

    const methodDetails = getMethodDetails('spb');


    return (
        <>
            <div className="text-lightText dark:text-darkText max-w-[375px] mx-auto">
                <div className="container mx-auto p-5">
                    <div className="rounded-lg">
                        <TransactionInfo id={orderData.transactionId} amount={orderData.amount} currency={orderData.currency} />
                        <MethodBlock title={methodDetails.title} imageSrc={methodDetails.logo}  />
                        <Details number={orderData.number} amount={orderData.amount} name={orderData.name} bankName={bankName} currency={orderData.currency} />
                    </div>
                </div>

            </div>
        </>
    )
}


export default MainForm