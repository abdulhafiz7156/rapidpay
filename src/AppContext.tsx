import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define the shape of your context data
interface OrderData {
    transactionId: string;
    amount: string;
    number: string;
    name: string;
    currency: string;
    method: string;
    bankName: string;
    bankCode: string;
    created_at: string;
    state: string;
}

interface AppContextProps {
    orderData: OrderData | null;
    loading: boolean;
    error: Error | null;
}

// Create context with default null values
const AppContext = createContext<AppContextProps | null>(null);

// Define the props for the provider, including children
interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
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
                    state: "pending",
                });
            } catch (error) {
                setError(error as Error);
                console.error('Error fetching order data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
        const intervalId = setInterval(fetchOrderData, 5000); // Refresh every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <AppContext.Provider value={{ orderData, loading, error }}>
            {children}
        </AppContext.Provider>
    );
};

// Hook to use the context
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
