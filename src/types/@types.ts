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
    transactionType: transactionActions,
    details: string,
    amount: number,
    paymentMethod: string,
    userId?: string
}


enum transactionActions {
    policy_purchase, policy_renewal, premium_payment, claim_payout, unknown
}