import { Response, NextFunction } from 'express';
import { admin } from '../firebase/config';


import { CustomRequest } from '../types/expressTypes';

const verifyIdToken = async (request: CustomRequest, response: Response, next: NextFunction) => {
    try {
        const idToken = request.headers.authorization?.split('Bearer ')[1];
        if (!idToken) {
            response.status(401).send({ error: 'No ID token provided.' });
            return;
        }
        let decodedToken;
        try {
            decodedToken = await admin.auth().verifyIdToken(idToken);
        }
        catch (error) {
            response.status(401).send({ error: 'Invalid or expired ID token.' });
            return;
        }
        request['userId'] = decodedToken.uid;
        next();
    } catch (error) {
        response.status(401).send({ error: 'Invalid or expired ID token.' });
    }
};

export default verifyIdToken;