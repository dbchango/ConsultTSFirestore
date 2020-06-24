import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const routes = Router();
const db = main.db;
const collection = "clients";

interface Client {
    name: string,
    register: string, 
    direction: string
    
}

//Adding clients function
routes.post('/clients', async(req, res)=>{
    try{
        const newClient : Client ={
            name: req.body["name"],
            register: req.body["register"], 
            direction: req.body["direction"]
            
        };     
        const clientAdded = await firebaseHelper.firestore
                                .createNewDocument(db, collection, newClient);
        res.status(201).send(`Client was added to collection with id ${clientAdded.id}`);
    }catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

//Search a doc by id
routes.get('/clients/:id', async(req, res)=>{
    let varId = req.params.id;
    try{
        const docObtained = await firebaseHelper.firestore.getDocument(db, collection, varId);
        res.status(201).send(docObtained);
    }catch(err){    
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

//Modify docs by id
routes.patch('/clients/:id', async(req, res)=>{
    try{
        var id = req.params.id;
        const client : Client ={
            name: req.body["name"],
            register: req.body["register"], 
            direction: req.body["direction"]
        };   
        await firebaseHelper.firestore.updateDocument(db, collection, id, client);
        res.status(201).send(`Client with id ${id} was updated`);
    }catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

//Delete clients by id
routes.delete('/clients/:id', async(req, res)=>{
    let varId = req.params.id;
    try{
        const docDeleted = await firebaseHelper.firestore.deleteDocument(db, collection, varId);
        res.status(201).send(`Client ${docDeleted} has been deleted`);
    }catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
})

//List collection`s docs
routes.get('/clients', (req, res)=>{
    firebaseHelper.firestore.backup(db, collection)
    .then(result=>res.status(200).send(result))
    .catch(err=>res.status(400).send(`An error has ocurred ${err}`));
});

export { routes };