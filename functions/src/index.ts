import 'dotenv/config'

import * as functions from 'firebase-functions';
import express from 'express';
import * as brainTreeApi from './braintree/api';

require('dotenv').config()

const cors = require('cors')({ origin: true });

const app = express();

app.disable("x-powered-by");
app.use(cors);

app.use('/pay', brainTreeApi.brainTreeRouter)

export const api = functions.https.onRequest(app);