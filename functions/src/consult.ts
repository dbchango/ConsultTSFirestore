import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const routes = Router();
const db = main.db;
const collection = "consults";

interface Consult {
    date: Date,
    observation: string,
    price: number,
    idPet: string
}

routes.post('/consults', async (req, res) => {           
    try{            
        const newConsult : Consult = {
            date: new Date(),
            observation: req.body['observation'],
            price: req.body['price'],
            idPet: req.body['idPet']
        };      
        const consAdded = await firebaseHelper.firestore
                                .createNewDocument(db, collection, newConsult);
        res.status(201).send(`Consult was added to collection with id ${consAdded.id}`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`)
    }
});

routes.get('/consults/:id', (req,res)=>{    
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).send(doc))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

routes.patch('/consults/:id', async(req, res) => {
    try{       
        var id = req.params.id;
        const pet : Consult = {
            date: new Date(),
            observation: req.body['observation'],
            price: req.body['price'],
            idPet: req.body['idPet']
        };      
        await firebaseHelper.firestore.updateDocument(db, collection, id, pet);
        res.status(200).send(`Consult with id ${id} was updated`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.delete('/consults/:id', async (request, response) => {
    try{        
        let id = request.params.id;
        await firebaseHelper.firestore.deleteDocument(db, collection, id);
        response.status(200).send(`Consult document with id ${id} was deleted`);
    }
    catch(err){
        response.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.get('/consults', (req, res) =>{     
    firebaseHelper.firestore.backup(db, collection)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

export { routes };

