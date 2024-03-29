export type IpInfo = {
    ip: string,
    success: boolean,
    type: string,
    continent: string,
    continent_code: string,
    country: string,
    country_code: string,
    region: string,
    region_code: string,
    city: string,
    latitude: number,
    longitude: number,
    is_eu: boolean,
    postal: string,
    calling_code: string,
    capital: string,
    borders: string,
    timezone: {
        id: string,
        abbr: string,
        utc: string
    }
};

export type transactionLog = {
    transactionType: TransactionAction,
    details: string,
    amount: number,
    paymentMethod: string,
    userId?: string
}

export enum TransactionAction {
    PolicyPurchase = 'policy_purchase',
    PremiumRenewal = 'policy_renewal',
    PremiumPayment = 'premium_payment',
    Unknown = "unknown"
}