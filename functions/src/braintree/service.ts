import { logger } from 'firebase-functions';
import { gateway } from './config';

import { ClientToken, Transaction } from 'braintree';


/** singleton instance */
class BrainTreeService {
    private static instance: BrainTreeService;
    private constructor() { }

    public static getInstance(): BrainTreeService {
        if (!BrainTreeService.instance) {
            BrainTreeService.instance = new BrainTreeService();
        }
        return BrainTreeService.instance;
    }

    /**
     * generate token.
     * returning a promise token after calling the gateway
     */
    generateToken(): Promise<ClientToken> {
        logger.info('client_token called');
        return gateway.clientToken.generate({});
    }

    /**     
     * @param nonce nonce from user approval
     * @param deviceData device data if enabled *optional
     */
    async createSale(nonce: string, deviceData: string, amount: string): Promise<Transaction> {
        logger.info('createSale called ', nonce, deviceData);
        const response = await gateway.transaction.sale({
            amount: amount,
            paymentMethodNonce: nonce,
            deviceData: deviceData,
            options: {
                submitForSettlement: true
            }
        });

        if (!response.success) throw new Error('Transaction failed');
        return response.transaction
    }
}

export const brainTreeService = BrainTreeService.getInstance();