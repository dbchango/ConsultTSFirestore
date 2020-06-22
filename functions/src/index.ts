import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper';
import * as express from 'express';
import * as bodyParser from 'body-parser';

admin.initializeApp({
    credential: admin.credential.cert(require("../../serviceAccountKey.json")),
    databaseURL: "https://consultoriovet-eb010.firebaseio.com"
});

const db = admin.firestore();
const app = express();
const main = express();
const collectionClients = "clients";
const collectionPets = "pets";
main.use("/api", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));
export const api = functions.https.onRequest(main);

//Adding clients function
app.post('/clients', async(req, res)=>{
    try{
        const newClient = await firebaseHelper.firestore.createNewDocument(db, collectionClients, req.body);
        res.status(201).send(`Client was added to collection with id ${newClient.id}`);
    }catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

//Search a doc by id
app.get('/clients/:id', async(req, res)=>{
    let varId = req.params.id;
    try{
        const docObtained = await firebaseHelper.firestore.getDocument(db, collectionClients, varId);
        res.status(201).send(docObtained);
    }catch(err){    
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

//Modify docs by id
app.patch('/clients/:id', async(req, res)=>{
    let varId = req.params.id;
    try{
        const docUpdated = await firebaseHelper.firestore.updateDocument(db, collectionClients, varId, req.body);
        res.status(201).send(`Client with id ${docUpdated.id} was updated`);
    }catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

//Delete clients by id
app.delete('/clients/:id', async(req, res)=>{
    let varId = req.params.id;
    try{
        const docDeleted = await firebaseHelper.firestore.deleteDocument(db, collectionClients, varId);
        res.status(201).send(`Client ${docDeleted} has been deleted`);
    }catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
})

//List collection`s docs
app.get('/clients', (req, res)=>{
    firebaseHelper.firestore.backup(db, collectionClients)
    .then(result=>res.status(200).send(result))
    .catch(err=>res.status(400).send(`An error has ocurred ${err}`));
});

//Create pets by user id
app.post('/pets', async(req, res)=>{
    try{
        const newPet = await firebaseHelper.firestore.createNewDocument(db, collectionPets, req.body)
        res.status(201).send(`Pet has been created ${newPet}`);
    }catch(err){
        res.status(400).send('An error has been ocurred');
    }
})

//Search pet by id 
app.get('/pets/:id', async(req, res)=>{
    let varId = req.params.id;
    try{
        const docObtained = await firebaseHelper.firestore.getDocument(db, collectionPets, varId);
        res.status(201).send(docObtained);
    }catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

//Update client`s information
app.patch('/pets/:id', async(req, res)=>{
    let varId = req.params.id;
    try{
        const docUpdated = await firebaseHelper.firestore.updateDocument(db, collectionPets, varId, req.body);
        res.status(200).send(`Person with id ${docUpdated}`);
    }catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

//Delete pets by id
app.delete('/pets/:id', async(req, res)=>{
    let varId = req.params.id;
    try{
        const docDeleted = await firebaseHelper.firestore.deleteDocument(db, collectionPets, varId);
        res.status(201).send(`Pet has been deleted ${docDeleted}`);
    }catch(err){
        res.status(400).send(`An error ocurred ${err}`);
    }
});

//List collectionPets docs
app.get('/pets', async(req, res)=>{
    firebaseHelper.firestore.backup(db, collectionPets)
    .then(result => res.status(201).send(result))
    .catch(err=>res.status(400).send(`An error has ocurred ${err}`));
});

export { app };

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
