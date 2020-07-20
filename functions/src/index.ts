import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

//=========================CONFIG===========================//

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
db.settings({ignoreUndefinedProperties : true});

const main = express();
main.use(cors());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));
main.use('/api', require('./pet').routes);
main.use('/api', require('./client').routes);
//main.use('/api', require('./pettype').routes);
main.use('/api', require('./consult').routes);
//main.use('/api', require('./vaccine').routes);

export const api = functions.https.onRequest(main);
export { db };
export interface Message {
    title: string,
    text: string,
    icon: string
  };
  
  export function Message(title: string, text: string, icon: string){
    let message :  Message = {
      title: title,
      text: text,
      icon: icon
    }
    return message
  }