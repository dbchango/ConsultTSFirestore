import * as main from '../index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';
import { Client } from '../models/client';
import { Message } from '../models/message';


const routes = Router();
const db = main.db;
const collection = "clients";

//--------------------------------------------------------------------------------------------------------////
//------------------------------------------------Clients CRUD`s------------------------------------------////
//--------------------------------------------------------------------------------------------------------////
routes.post('/clients', async(req, res)=>{
    try{
        const newClient = Client(req.body); 
        const clientAdded = await firebaseHelper.firestore
                                .createNewDocument(db, collection, newClient);
        res.status(201).json(Message('Client added', `Client was added with id: ${clientAdded.id}`, 'success'));
    }catch(err){
        res.status(400).json(Message('An error has ocurred', `${err}`, 'error'));
    }
});

//Search a doc by id
routes.get('/clients/:id', async(req, res)=>{
    let varId = req.params.id;
        await db.collection(collection).doc(varId).get()
        .then(
            doc=>{
                res.status(200).json(Client(doc.data(), doc.id ));
            }
        ).catch(err => res.status(400).json(Message('An error has ocurred', `${err}`, 'error')));


});

//Modify docs by id
routes.put('/clients/:id', async(req, res)=>{
    try{
        var id = req.params.id;
        const newClient = Client(req.body); 
        await firebaseHelper.firestore.updateDocument(db, collection, id, newClient);
        res.status(201).json(Message('Client updated', `Client with id: ${id} has been updated`, 'success'));
    }catch(err){
        res.status(400).json(Message('An error has ocurred', `${err}`, 'error'));
    }
});

//Delete clients by id
routes.delete('/clients/:id', async(req, res)=>{
    let varId = req.params.id;
    try{
        await firebaseHelper.firestore.deleteDocument(db, collection, varId);
        res.status(201).json(Message('Client deleted', `Client with id:${varId} has been deleted`,'success' ))
    }catch(err){
        res.status(400).json(Message('An error has ocurred', `${err}`, 'error'));
    }
});

//List collection`s docs
routes.get('/clients', (req, res)=>{
    db.collection(collection).get().then(
        snapshot=>{
        res.status(200).json(snapshot.docs.map(doc=>Client(doc.data(), doc.id)));
    }).catch(err=>res.status(400).json(Message('An error has ocurred', `${err}`, 'error')));
});

//list codes by interval
routes.get('/clients/interval/:limit/:last', (req,res)=>{
    var last:number = parseInt(req.params.last);
    var limit:number = parseInt(req.params.limit);
    db.collection(collection).limit(limit).offset(last)
    .get()
    .then(snapshot=>{
        res.status(200).json(snapshot.docs.map(doc=>Client(doc.data(), doc.id)));
    }
    ).catch(err=>res.status(400).json(Message('An error has ocurred', `${err}`, 'error')))
});

export { routes };