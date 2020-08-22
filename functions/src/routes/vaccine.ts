import * as main from '../index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';
import { Vaccine } from '../models/vaccine';
import { Pet } from '../models/pet';
import { Message } from '../models/message';

const routes = Router();
const db = main.db;
const collection = "vaccines";

//--------------------------------------------------------------------------------------------------------////
//------------------------------------------------Vaccine CRUD`s------------------------------------------////
//--------------------------------------------------------------------------------------------------------////

//------Crear Vacunas------// 
routes.post('/vaccines', async(req, res)=>{
    try{
        const newVaccine = Vaccine(req.body);
        const pet = await db.collection("pets").doc(req.body['idpet']).get();
        newVaccine.pet = Pet(pet.data(), pet.id);
        console.log(newVaccine.pet);
        const id = (await db.collection(collection).add(newVaccine)).id;
        res.status(201).json(Message('Vaccine added', `Vaccine was added with id: ${id}`, 'success'));
        console.log(req.body['idpet'])
    }catch(err){
        res.status(400).json(Message('An error has ocurred', `${err}`, 'error'));
    }
});

//-----------Leer----------//
routes.get('/vaccines/:id', async(req, res)=>{
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).json(Vaccine(doc.id, doc)))
        .catch(err => res.status(400).json(Message('An error has ocurred', `${err}`, 'error')));
});

//------Actualizar--------//
routes.put('/vaccines/:id', async(req, res) => {
    try{
        const newVaccine = Vaccine(req.body, req.params.id);
        await firebaseHelper.firestore.updateDocument(db, collection, req.params.id, newVaccine);
        res.status(400).json(Message('Vaccine was updeted', `Vaccine with id: ${req.params.id} was updated`, 'success'))
    }catch(err){
        res.status(400).json(Message('An error has ocurred', `${err}`, 'error'))
    }
});

//------Eliminar------//
routes.delete('/vaccines/:id', async(req, res) => {
    try{
        await db.collection(collection).doc(req.params.id).delete();
        res.status(201).json(Message('Vaccine deleted', `Vaccine with ${req.params.id} was deleted`, 'success'))
    }catch(err){
        res.status(400).json(Message('An error has ocurred', `${err}`, 'error'))
    }

});
//------consulta Lista de Vacunas-------//
routes.get('/vaccines', (req, res) =>{     
    db.collection(collection).get()
    .then(snapshot=>{
        res.status(200).json(snapshot.docs.map(doc=>Vaccine(doc.data(), doc.id)));
    })
    .catch(err=>res.status(400).json(Message('An error has ocurred', `${err}`, 'error')));
});

routes.get('/pets/:id/vaccines', (req, res)=>{
    db.collection(collection).where('idpet','==', req.params.id).get()
    .then(snapshot=>res.status(200).json(snapshot.docs.map(doc=>Vaccine(doc.data(), doc.id))))
    .catch(err=>res.status(400).json(Message('An error has ocurred', `${err}`, 'error')));
});

export { routes };

