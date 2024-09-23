import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch order data from API
        const fetchOrderData = async () => {
            const apiUrl = 'https://rap1dpay.com/api/v2/orders/66ee3b8f58b90';
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const jsonResponse = await response.json();
                const data = jsonResponse.data;

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
                    state: "pending" || 'pending',
                });
            } catch (error) {
                setError(error);
                console.error('Error fetching order data:', error);
            } finally {
                setLoading(false);
            }
        };

        // Fetch data immediately on mount
        fetchOrderData();

        // Set interval to refresh data every 5 seconds
        const intervalId = setInterval(fetchOrderData, 2000);

        // Cleanup interval on unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <AppContext.Provider value={{ orderData, loading, error }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
