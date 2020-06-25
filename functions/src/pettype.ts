import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const routes = Router();
const db = main.db;
const collection = "pettypes";

interface PetType {
    name: string
}

//--------------------------------------------------------------------------------------------------------////
//-----------------------------------------------Pet Types CRUD`s-----------------------------------------////
//--------------------------------------------------------------------------------------------------------////

routes.post('/pettypes', async (req, res) => {           
    try{            
        const newPetType : PetType = {
            name: req.body['name']
        };      
        const petTypeAdded = await firebaseHelper.firestore
                                .createNewDocument(db, collection, newPetType);
        res.status(201).send(`Pet type was added to collection with id ${petTypeAdded.id}`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`)
    }
});

routes.get('/pettypes/:id', (req,res)=>{    
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).send(doc))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

routes.patch('/pettypes/:id', async(req, res) => {
    try{       
        var id = req.params.id;
        const pettype : PetType = {
            name: req.body['name']
        }; 
        await firebaseHelper.firestore.updateDocument(db, collection, id, pettype);
        res.status(200).send(`Pet type with id ${id} was updated`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.delete('/pettypes/:id', async (request, response) => {
    try{        
        let id = request.params.id;
        await firebaseHelper.firestore.deleteDocument(db, collection, id);
        response.status(200).send(`Pet type document with id ${id} was deleted`);
    }
    catch(err){
        response.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.get('/pettypes', (req, res) =>{     
    firebaseHelper.firestore.backup(db, collection)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

export { routes };

