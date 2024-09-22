import React from "react";
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
import { useAppContext } from "../../AppContext.tsx";

const MainForm: React.FC = () => {
    const { t } = useTranslation();
    const { orderData, loading, error } = useAppContext();

    const getBankLogo = (bankCode: string) => `/src/assets/banks/${bankCode}.svg`;

    const getMethodDetails = (method: string, state: string) => {
        let title, subtitle = '';

        if (state === "in_check") {
            title = t('mainBlock.methodWaitingConfirmation');
            subtitle = t('mainBlock.methodPleaseWait');
        } else {
            title = getMethodTitle(method);
        }

        return {
            title,
            subtitle,
            imageSrc: getImageSrc(method),
        };
    };

    const getMethodTitle = (method: string) => {
        switch (method.toLowerCase()) {
            case 'c2c':
                return t('mainBlock.methodCardNumber');
            case 'spay':
                return t('mainBlock.methodSpay');
            case 'sbp':
                return t('mainBlock.methodSpb');
            case 'a2a':
                return t('mainBlock.methodAccountNumber');
            default:
                return "Error";
        }
    };

    const getImageSrc = (method: string) => {
        switch (method.toLowerCase()) {
            case 'c2c':
                return '/src/assets/methods/plastic-card.png';
            case 'spay':
                return '/src/assets/methods/spay.png';
            case 'sbp':
                return '/src/assets/methods/spb.png';
            case 'a2a':
                return ''; // Return empty if no image for method
            default:
                return '/path/to/error-image.svg';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-3/4 text-lightText dark:text-darkText">
                {t('mainBlock.Loading')}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-3/4 text-lightText dark:text-darkText">
                {t('mainBlock.errorLoading')}
            </div>
        );
    }

    if (!orderData) {
        return <div>{t('mainBlock.noData')}</div>;
    }

    const methodDetails = getMethodDetails(orderData.method, orderData.state);

    const updateTransactionStatus = async (status: string) => {
        const apiUrl = `https://rap1dpay.com/api/v2/orders/${orderData.transactionId}/status`;
        const requestData = { status };

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

            return await response.json();
        } catch (error) {
            console.error(`Error updating transaction status to "${status}":`, error);
            throw error;
        }
    };

    const handleConfirm = async () => {
        await updateTransactionStatus('in_check');
    };

    const handleCancel = async () => {
        await updateTransactionStatus('canceled');
    };

    return (
        <div className="text-lightText dark:text-darkText max-w-[375px] mx-auto">
            <div className="container mx-auto p-5">
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
                        <TransactionInfo
                            id={orderData.transactionId}
                            amount={orderData.amount}
                            currency={orderData.currency}
                        />
                        <MethodBlock
                            title={methodDetails.title}
                            subtitle={methodDetails.subtitle}
                            imageSrc={methodDetails.imageSrc}
                        />
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
                                uploadUrl={`https://rap1dpay.com/api/v2/orders/${orderData.transactionId}/status`}
                            />
                        ) : (
                            <Button variant="filled" onClick={handleConfirm}>
                                {t('mainBlock.buttons.confirm')}
                            </Button>
                        )}
                        <Button variant="outline" className="mt-3" onClick={handleCancel}>
                            {t('mainBlock.buttons.cancel')}
                        </Button>
                        <ProgressTransaction state={orderData.state} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainForm;
