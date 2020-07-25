import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';
import { Pet, Consult, Client, Message } from './models';

const routes = Router();
const db = main.db;
const collection = "consults";

//--------------------------------------------------------------------------------------------------------////
//-----------------------------------------------Consults CRUD`s------------------------------------------////
//--------------------------------------------------------------------------------------------------------////

routes.post('/consults', async (req, res) => {           
    try{            
        const newConsult : Consult = {
            date: new Date().toDateString(),
            observation: req.body['observation'],
            price: req.body['price'],
            idpet: req.body['idpet'],
            idclient: req.body['idclient'],
            responsable: req.body['responsable'],
            status: req.body["status"]
        };      
        const pet = await db.collection("pets").doc(req.body['idpet']).get();
        newConsult.pet = Pet(pet.id, pet .data())
        const client = await db.collection("clients").doc(req.body['idclient']).get();
        newConsult.client = Client(client.data(), client.id);
        const id = (await db.collection(collection).add(newConsult)).id;
        console.log(id);
        res.status(201).json(Message('Consult added', `Consult with id: ${id} has been added`, 'success'));
    }
    catch(err){
        res.status(400).json(Message('An error has ocurred', `${err}`, 'error'))
    }
});

routes.get('/consults/:id', (req,res)=>{    
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).json(Consult(doc.id, doc)))
        .catch(err => res.status(400).json(Message('An error has ocured',`${err}`, 'error')));
});

routes.put('/consults/:id', async(req, res) => {
    try{       
        var id = req.params.id;
        const consult : Consult = {
            date: new Date().toDateString(),
            observation: req.body['observation']===undefined?null:req.body['observation'],
            price: req.body['price']===undefined?null:req.body['price'],
            idpet: req.body['idpet']===undefined?null:req.body['idpet'],
            idclient: req.body['idclient']===undefined?null:req.body['idclient'],
            responsable: req.body['responsable']===undefined?null:req.body['responsable'],
            status: req.body["status"]===undefined?null:req.body["status"]
        };      
        await firebaseHelper.firestore.updateDocument(db, collection, id, consult);
        res.status(200).json(Message('Consult updated', `Consult with id ${id} has been updated`, 'success'));
    }
    catch(err){
        res.status(400).json(Message('An error has ocured',`${err}`, 'error'));
    }
});

routes.delete('/consults/:id', async (req, res) => {
    try{        
        let id = req.params.id;
        await firebaseHelper.firestore.deleteDocument(db, collection, id);
        res.status(200).send(`Consult document with id ${id} was deleted`);
    }
    catch(err){
        res.status(400).json(Message('An error has ocured',`${err}`, 'error'));
    }
});

routes.get('/consults', (req, res) =>{     
 
    db.collection(collection).get()
    .then(snapshot=>{
        res.status(200).json(snapshot.docs.map(doc=>Consult(doc.id, doc.data())));
    })
    .catch(err=>res.status(400).json(Message('An error has ocurred', `${err}`, 'error')));
});


routes.get('/clients/:id/consults', (req, res)=>{
    let id = req.params.id;
    console.log(id);

    db.collection(collection).where('idclient','==', id).get()
    .then(snapshot=>{
        res.status(200).json(snapshot.docs.map(doc=>Consult(doc.id, doc.data())))
    }).catch(err=>res.status(400).json(Message('An error has ocurred', `${err}`, 'error')))
}

)



export { routes };

