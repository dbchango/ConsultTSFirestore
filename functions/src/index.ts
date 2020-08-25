import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { routesClient, routesPet, routesVaccines, routesVeterineries, routesConsults } from './router';

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

const server = express();
server.use(cors({origin: true}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

routesClient(server);
routesVaccines(server);
routesPet(server);
routesVeterineries(server);
routesConsults(server);
export const api = functions.https.onRequest(server);
export { db };
