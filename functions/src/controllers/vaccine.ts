import { db } from '../index';
import { Request, Response } from 'express';
import { Vaccine } from '../models/vaccine';
import { Message } from '../models/message';


const collection = "vaccines";

//--------------------------------------------------------------------------------------------------------////
//------------------------------------------------Vaccine CRUD`s------------------------------------------////
//--------------------------------------------------------------------------------------------------------////

//------Crear Vacunas------// 
export async function createVaccine(req: Request, res: Response){
    try{
        const newVaccine = Vaccine(req.body);
        let idVaccine = (await db.collection(collection).add(newVaccine)).id
        return res.status(201).json(Message('Vaccine added', `Vaccine was added with id: ${idVaccine}`, 'success'))
    }catch(err){
        return handleError(res, err);
    }

}

export async function retrieveVaccine(req: Request, res: Response){
    try{    
        let id = req.params.id;
        const doc = await db.collection(collection).doc(id).get();
        if(!doc){
            return res.status(404).json(Message('Vaccine does not found', `Vaccine with id: ${id} has not found`, 'warning'));
        }
        return res.status(200).json(Vaccine(doc.data(), doc.id))
    }catch(err){
        return handleError(res, err);
    }
}

export async function updateVaccine(req: Request, res: Response){
    try{
        let id = req.params.id;
        const newVaccine = Vaccine(req.body);
        db.collection(collection).doc(id).set(newVaccine, {merge:true});
        return res.status(201).json(Message('Vaccine was updeted', `Vaccine with id: ${req.params.id} was updated`, 'success'));
    }catch(err){
        return handleError(res, err)
    }
}

export async function deleteVaccine(req:Request, res:Response){
    try{
        let id = req.params.id;
        await db.collection(collection).doc(id).delete();
        res.status(201).json(Message('Vaccine deleted', `Vaccine with ${req.params.id} was deleted`, 'success'))
    }catch(err){
        return handleError(res, err);
    }
}

export async function listVaccine(req: Request, res:Response){
    try{
        const snapshot = await db.collection(collection).get();
        res.status(200).json(snapshot.docs.map(doc => Vaccine(doc.data(), doc.id)) )
    }catch(err){
        return handleError(res, err);
    }
}


/*
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
*/

function handleError(res: Response, err:any){
    res.status(500).send({message: `${err.code} - ${err.message}`})
}


