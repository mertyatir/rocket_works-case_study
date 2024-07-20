import * as admin from 'firebase-admin';
import serviceAccount from '../secrets/rocketworks-assignment-firebase-adminsdk.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export const db = admin.firestore();
export { admin };
