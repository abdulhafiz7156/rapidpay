import React, { useEffect, useState } from "react";
import MethodBlock from "../MethodBlock/MethodBlock.tsx";
import { useTranslation } from "react-i18next";
import Details from "../Details/Details.tsx";
import TransactionInfo from "../TransactionInfo/TransactionInfo.tsx";
import Timer from "../Timer/Timer.tsx";
import Button from "../Button/Button.tsx";
import Success from "../StateTransaction/Success.tsx";
import ImageUploader from "../ImageUploader/ImageUploader.tsx";
import Failed from "../StateTransaction/Failed.tsx";
import ProgressTransaction from "../ProgressTransaction/ProgressTransaction.tsx";

interface Transaction {
    transactionId: string;
    amount: string;
    number: string;
    name: string;
    bankName: string;
    bankCode: string;
    currency: string;
    method: string;
    created_at: string;
    state: string;
}

const MainForm: React.FC = () => {
    const { t } = useTranslation();
    const [orderData, setOrderData] = useState<Transaction | null>(null);

    useEffect(() => {
        const fetchOrderData = async () => {
            const apiUrl = 'https://rap1dpay.com/api/v2/orders/66eb1a965097a';
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
                const data = jsonResponse.data;
                console.log(data)

                setOrderData({
                    transactionId: data.order_id || 'N/A',
                    amount: data.amount || 'N/A',
                    number: data.invoice.address || 'N/A',
                    name: data.invoice.recipient || 'N/A',
                    currency: data.invoice.method.currency || 'N/A',
                    method: data.invoice.method.code || 'N/A',
                    bankName: data.invoice.bank.name || 'N/A',
                    bankCode: data.invoice.bank.code || 'N/A',
                    created_at: data.invoice.created_at,
                    state: 'pending' || 'N/A',
                });
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };

        fetchOrderData();
    }, []);

    const getBankLogo = (bankCode: string) => {
        return `/src/assets/banks/${bankCode}.svg`; // Формируем путь к изображению
    };

    const getMethodDetails = (method: string, state: string) => {
        let title;
        let subtitle;

        if (state === "in_check") {
            title = t('mainBlock.methodWaitingConfirmation');
            subtitle = t('mainBlock.methodPleaseWait');
        } else {
            switch (method.toLowerCase()) {
                case 'c2c':
                    title = t('mainBlock.methodCardNumber');
                    break;
                case 'spay':
                    title = t('mainBlock.methodSpay');
                    break;
                case 'sbp':
                    title = t('mainBlock.methodSpb');
                    break;
                case 'sbpg':
                    title = t('mainBlock.methodSpb');
                    break;
                case 'a2a':
                    title = t('mainBlock.methodAccountNumber');
                    break;
                default:
                    title = "Error";
                    break;
            }
            subtitle = "";
        }

        return {
            title,
            subtitle,
            imageSrc: getImageSrc(method),
        };
    };

    const getImageSrc = (method: string) => {
        switch (method.toLowerCase()) {
            case 'c2c':
                return '/src/assets/methods/plastic-card.png';
            case 'spay':
                return '/src/assets/methods/spay.png';
            case 'sbp':
                return '/src/assets/methods/spb.png';
            case 'sbpg':
                return '/src/assets/methods/spb.png';
            case 'a2a':
                return '';
            default:
                return '/path/to/error-image.svg';
        }
    };

    if (!orderData) {
        return <div
            className="flex justify-center items-center h-3/4 text-lightText dark:text-darkText">{t('mainBlock.Loading')}</div>;
    }

    const methodDetails = getMethodDetails(orderData.method, orderData.state);

    const updateTransactionStatus = async (status: string, apiUrl: string) => {
        const requestData = {
            status: status,
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log(`Transaction status updated to "${status}":`, result);
            return result;
        } catch (error) {
            console.error(`Error updating transaction status to "${status}":`, error);
            throw error;
        }
    };

    const confirmTransaction = async () => {
        const apiUrl = 'https://rap1dpay.com/api/v2/orders/66ed43f934de1/status';
        try {
            await updateTransactionStatus('in_check', apiUrl);
        } catch (error) {
            console.error('Error confirming transaction:', error);
        }
    };

    const cancelTransaction = async () => {
        const apiUrl = 'https://rap1dpay.com/api/v2/orders/66ed43f934de1/status';
        try {
            await updateTransactionStatus('canceled', apiUrl);
        } catch (error) {
            console.error('Error canceling transaction:', error);
        }
    };

    return (
        <div className="text-lightText dark:text-darkText max-w-[375px] mx-auto">
            <div className="container mx-auto p-5 ">
                {orderData.state}
                {orderData.state === "finished" || orderData.state === "success" ? (
                    <div className="flex items-center h-[75vh] flex-col justify-center">
                        <Success amount={orderData.amount} currency={orderData.currency} />
                    </div>
                ) : orderData.state === "canceled" || orderData.state === "expired" ? (
                    <div className="flex items-center h-[75vh] flex-col justify-center">
                        <Failed />
                    </div>
                ) : (
                    <div className="rounded-lg">
                        <TransactionInfo id={orderData.transactionId} amount={orderData.amount}
                                         currency={orderData.currency} />
                        <MethodBlock title={methodDetails.title} subtitle={methodDetails.subtitle} imageSrc={methodDetails.imageSrc} />
                        <Details
                            number={orderData.number}
                            amount={orderData.amount}
                            name={orderData.name}
                            bankName={orderData.bankName}
                            currency={orderData.currency}
                            bankLogo={getBankLogo(orderData.bankCode)}
                        />
                        <Timer createdAt={orderData.created_at} />
                        {orderData.state === "in_check" ? (
                            <ImageUploader
                                onUpload={(base64Image) => {
                                    console.log('Image uploaded successfully:', base64Image);
                                    alert('Image uploaded successfully!');
                                }}
                                uploadUrl='https://rap1dpay.com/api/v2/orders/66ed43f934de1/status'
                            />
                        ) : (
                            <Button variant="filled"
                                    onClick={confirmTransaction}>{t('mainBlock.buttons.confirm')}</Button>
                        )}
                        <Button variant="outline" className="mt-3" onClick={cancelTransaction}>{t('mainBlock.buttons.cancel')}</Button>
                        <ProgressTransaction state={orderData.state} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MainForm;
