import * as express from 'express';
import { brainTreeService } from './service';
import { firestoreService } from '../firebase/service';
import { logger } from 'firebase-functions';

import purchasableItems from '../data/purchasableItems';

import verifyIdToken from '../middlewares/verifyIdToken';

import { CustomRequest } from '../types/expressTypes';



/**
 * express router to create the apis.
 */
const theRouter = express.Router();

/**
 * fetch the client token
 */
theRouter.get('/client_token', async (request: express.Request, response: express.Response) => {
    try {
        const token = await brainTreeService.generateToken();
        response.contentType('application/json').send({ token: token });
    } catch (e) {
        response.contentType('application/json').status(400).send({ error: e });
    }

});

/**
 * create a sale.
 */
theRouter.post('/sale', verifyIdToken, async (request: CustomRequest, response) => {

    logger.info('/sale called ');


    const userId = request['userId'];
    if (!userId) return

    const nonceFromTheClient = request.body.nonce;
    const deviceDataFromTheClient = request.body.deviceData;
    const amount = request.body.amount;

    if (!nonceFromTheClient) {
        return response.status(400).send({ error: 'No nonce provided.' });
    }

    let result;
    try {
        result = await brainTreeService.createSale(nonceFromTheClient, deviceDataFromTheClient, amount);
    }
    catch (e) {
        return response.status(400).send({ error: e });
    }



    try {
        await firestoreService.setWalletBalance(userId, amount);
    }
    catch (e) {
        return response.status(400).send({ error: e });
    }

    return response.contentType('application/json').send({ result: result });

});


theRouter.post("/transactions", verifyIdToken, async (request: CustomRequest, response: express.Response) => {


    const userId = request['userId'];

    if (!userId) return

    const amount = request.body.amount;

    if (!amount) {
        return response.status(400).send({ error: 'No amount provided.' });
    }
    const itemId = request.body.itemId;
    if (!itemId) {
        return response.status(400).send({ error: 'No item ID provided.' });
    }
    // Find the item in the purchasableItems array
    const item = purchasableItems.find((item) => item.id === itemId);
    if (!item) {
        return response.status(400).send({ error: 'Invalid item ID.' });
    }
    const totalAmount = +item.price * +amount;

    let result = await firestoreService.updateWalletBalance(userId, totalAmount);
    if (result.error) {
        return response.status(400).send({ error: result.error });
    }

    result = await firestoreService.addTransaction(userId, itemId, amount, totalAmount);
    if (result.error) {
        return response.status(400).send({ error: result.error });
    }

    return response.send({ message: 'Transaction successful.' });
}
);





export const brainTreeRouter = theRouter;