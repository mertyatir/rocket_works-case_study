# Next.js Project with Firebase and Braintree

This project integrates Next.js with Firebase functions, Firestore Database, Firebase Google OAuth 2.0 Authentication, and Braintree Sandbox for payments.

## Data Model & Firestore Schema

### TransactionHistory

- `amount` (number)
- `itemId` (number)
- `timestamp` (string)
- `totalAmount` (number)

### WalletBalance

- `balance` (number)
- `lastUpdated` (string)

### Firestore Collections

- `transactions/{userId}/history/{transactionId}` for transaction history.
- `walletBalances/{userId}` for user balances.

## Performance

- **User-Centric Data:** Storing transaction history as a subcollection under each user document (`transactions/userID/history`) simplifies querying transactions for a specific user.
- **Scalability:** Firestore automatically scales collections and subcollections, ensuring efficient queries as the user base grows.
- **Direct Access:** Storing each user's wallet balance in a document keyed by `userId` (`walletBalances/userId`) allows for quick reads and updates.
- **Simplicity:** Efficient for displaying a user's current balance or updating it after a transaction.

### Cons

- **Cross-User Queries:** More complex queries or additional indexing may be required for analytics or administrative purposes.

### TODO

- Implement transactions and batched writes to prevent race conditions and ensure atomic operations, enhancing data consistency and integrity.

## Security Architecture

### Authentication

- Google OAuth 2.0 for secure user authentication without sharing password details.

### Firestore Security Rules

- Ensure users can only access their transaction history and wallet balances. Writing is restricted to backend services.

### Payment Security

- Braintree securely processes payments using a nonce—a unique, temporary security token that safely conveys payment data without revealing sensitive information.

### Communication Security

- All data in transit should be protected using HTTPS, ensuring secure encryption during transmission.

### Testing Credit Card Purchases

Use the following dummy credit card information for testing:

```
4111 1111 1111 1111

Expiration Date: Any date in the future
```

### Setting Up the Project

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/mertyatir/rocket_works-case_study.git
cd rocket_works-case_study/
npm install
cd functions/
npm install
```

## Configuring Firebase

1. Create a new Firebase project.
2. Enable Google Sign-In Method.
3. Create a Firestore Database with the default name.
4. Set the Cloud Firestore rules:

   ```plaintext
   service cloud.firestore {
       match /databases/{database}/documents {
           match /transactions/{userId}/history/{transactionId} {
               allow read: if request.auth.uid == userId;
               allow write: if false;
           }
           match /walletBalances/{userId} {
               allow read: if request.auth.uid == userId;
               allow write: if false;
           }
           match /{document=**} {
               allow read, write: if false;
           }
       }
   }:
   ```


5. Add a new web app to Firebase and copy the credentials.
6. Add the credentials to .env.local file at the root of your project:

```

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_BASE_URL=

```

7. Generate new private key from firebase project settings/service accounts
8. Download and add json file to functions/src/secrets with name:

```

rocketworks-assignment-firebase-adminsdk.json

```


9. Upgrade to Blaze plan
10. Activeate firebase functions
11. Deploy functions with

```

firebase deploy

```

## Configuring Braintree

1. Obtain Braintree credentials from https://www.braintreegateway.com
2. Add the credentials to the .env file in the functions directory:

```

BRAINTREE_MERCHANT_ID =
BRAINTREE_PUBLIC_KEY =
BRAINTREE_PRIVATE_KEY =
MY_APP_FIREBASE_API_KEY=
MY_APP_FIREBASE_AUTH_DOMAIN=
MY_APP_FIREBASE_PROJECT_ID=
MY_APP_FIREBASE_STORAGE_BUCKET=
MY_APP_FIREBASE_MESSAGING_SENDER_ID=
MY_APP_FIREBASE_APP_ID=

```

start next app with:

```
npm run dev

```
