import * as main from '../index';;
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';
import { Veterinary } from '../models/veterinary';
import { Message } from '../models/message';


const routes = Router(); 
const db = main.db;
const collection ='veterinaries';

routes.post('/veterinaries', async(req, res)=>{
    try{
        const newVeterinar = Veterinary(req.body);
        const veterinaryAdded = await firebaseHelper
        .firestore.createNewDocument(db, collection, newVeterinar);
        res.status(201).json(Message('Veterinary added', `Veterinary added with id: ${veterinaryAdded.id}`, 'success'))
    }catch(err){
        res.status(400).json(Message('An error has ocurred', `${err}`, 'error'));
    }
});

//-----------Leer----------//
routes.get('/veterinaries/:id', async(req, res)=>{
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).json(Veterinary(doc, doc.id)))
        .catch(err => res.status(400).json(Message('An error has ocurred', `${err}`, 'error')));
});

//------Actualizar--------//
routes.put('/veterinaries/:id', async(req, res) => {
    try{
        const newVeterinarie = Veterinary(req.body, req.params.id);
        await firebaseHelper.firestore.updateDocument(db, collection, req.params.id, newVeterinarie);
        res.status(400).json(Message('Veterinary has been updated', `Veterinary with id: ${req.params.id} has been updated`, 'success'))
    }catch(err){
        res.status(400).json(Message('An error has ocurred', `${err}`, 'error'))
    }
});

//------Eliminar------//
routes.delete('/veterinaries/:id', async(req, res) => {
    try{
        await db.collection(collection).doc(req.params.id).delete();
        res.status(201).json(Message('Veterinary deleted', `Veterinary with ${req.params.id} has been deleted`, 'success'))
    }catch(err){
        res.status(400).json(Message('An error has ocurred', `${err}`, 'error'))
    }

});
//------consulta Lista de Vacunas-------//
routes.get('/veterinaries', (req, res) =>{     
    db.collection(collection).get()
    .then(snapshot=>{
        res.status(200).json(snapshot.docs.map(doc=>Veterinary(doc.data(), doc.id)));
    })
    .catch(err=>res.status(400).json(Message('An error has ocurred', `${err}`, 'error')));
});



export { routes };


