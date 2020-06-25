import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const routes = Router();
const db = main.db;
const collection = "clients";

interface Client {
    ci: string,
    phone: string,
    name: string,
    age: number, 
    direction: string,
    gender: string
}

//--------------------------------------------------------------------------------------------------------////
//------------------------------------------------Clients CRUD`s------------------------------------------////
//--------------------------------------------------------------------------------------------------------////
routes.post('/clients', async(req, res)=>{
    try{
        const newClient : Client ={
            ci: req.body["ci"],
            phone: req.body["phone"],
            age: req.body["age"],
            name: req.body["name"],
            direction: req.body["direction"],
            gender: req.body["gender"]
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
        const newClient : Client ={
            ci: req.body["ci"],
            phone: req.body["phone"],
            age: req.body["age"],
            name: req.body["name"],
            direction: req.body["direction"],
            gender: req.body["gender"]
        };      
        await firebaseHelper.firestore.updateDocument(db, collection, id, newClient);
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