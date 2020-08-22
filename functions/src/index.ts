import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

//=========================CONFIG===========================//

admin.initializeApp(functions.config().firebase);
/*
var serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://consultoriovet-eb010.firebaseio.com"
});
*/


const db = admin.firestore();
db.settings({ignoreUndefinedProperties : true});

const main = express();
main.use(cors());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));
main.use('/api', require('./routes//pet').routes);
main.use('/api', require('./routes/client').routes);
main.use('/api', require('./routes/consult').routes);
main.use('/api', require('./routes/vaccine').routes);
main.use('/api', require('./routes/veterinary').routes);
main.use('/api', require('./routes/auth').routes);

export const api = functions.https.onRequest(main);
export { db };
