import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';
import { Pet, Message } from './models';

const routes = Router();
const db = main.db;
const collection = "pets";

//--------------------------------------------------------------------------------------------------------////
//------------------------------------------------Pets CRUD`s --------------------------------------------////
//--------------------------------------------------------------------------------------------------------////
routes.post('/pets', async (req, res) => {           
    try{      
        const newPet : Pet = {
            name: req.body['name'],
            color: req.body['color'],
            age: req.body['age'],
            idclient: req.body['idclient'],
            type: req.body['type'],
            sex: req.body["sex"],
        };      
        const petAdded = await firebaseHelper.firestore
                                .createNewDocument(db, collection, newPet);
        res.status(201).json(Message('Pet added', `Pet with id: ${petAdded.id} was added`, 'error'));
    }
    catch(err){
        res.status(400).json(Message('An error has ocurred', `${err}`, 'error'))
    }
});

routes.get('/pets/:id', (req,res)=>{    
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).json(Pet(doc.id, doc)))
        .catch(err => res.status(400).json(Message('An error has ocurred', `${err}`, 'error')));
});

routes.put('/pets/:id', async(req, res) => {
    try{       
        var id = req.params.id;
        const pet : Pet = {
            name: req.body['name']===undefined?null:req.body['name'],
            color: req.body['color']===undefined?null:req.body['color'],
            age: req.body['age']===undefined?null:req.body['age'],
            idclient: req.body['idclient']===undefined?null:req.body['idclient'],
            type: req.body['type']===undefined?null:req.body['type'],
            sex: req.body["sex"]===undefined?null:req.body["sex"]
        }; 
        await firebaseHelper.firestore.updateDocument(db, collection, id, pet);
        res.status(200).json(Message('Pet was updated', `Pet with id: ${id} was updated`, 'success'));
    }
    catch(err){
        res.status(400).json(Message('An error has ocurred', `${err}`, 'error'));
    }
});

routes.delete('/pets/:id', async (request, response) => {
    try{        
        let id = request.params.id;
        await firebaseHelper.firestore.deleteDocument(db, collection, id);
        response.status(200).json(Message('Pet has been deleted', `Pet with id ${id} was deleted`, 'success'));
    }
    catch(err){
        response.status(400).json(Message('An error has ocurred', `${err}`, 'error'));
    }
});

routes.get('/pets', (req, res) =>{     
    db.collection(collection).get()
    .then(snapshot=>{
        res.status(200).json(snapshot.docs.map(doc=>Pet(doc.id, doc.data())));
    })
    .catch(err=>res.status(400).json(Message('An error has ocurred', `${err}`, 'error')));
});

routes.get('/clients/:id/pets', (req, res)=>{
    db.collection(collection).where('idclient','==', req.params.id).get()
    .then(snapshot=>{
        res.status(200).json(snapshot.docs.map(doc=>Pet(doc.id, doc.data())))
    })
    .catch(err=>res.status(400).json(Message('An error has ocurred', `${err}`, 'error')))
})

export { routes };

