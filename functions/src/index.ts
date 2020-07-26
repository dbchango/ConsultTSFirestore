import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

//=========================CONFIG===========================//

admin.initializeApp(functions.config().firebase);
/*
admin.initializeApp({
    credential: admin.credential.cert(require("../../serviceAccountKey.json")),
    databaseURL: "https://consultoriovet-eb010.firebaseio.com"
});*/


const db = admin.firestore();
db.settings({ignoreUndefinedProperties : true});

const main = express();
main.use(cors());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));
main.use('/api', require('./pet').routes);
main.use('/api', require('./client').routes);
main.use('/api', require('./consult').routes);
main.use('/api', require('./vaccine').routes);

export const api = functions.https.onRequest(main);
export { db };
