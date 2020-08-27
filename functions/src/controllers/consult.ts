import { db } from '../index'
import {Request, Response } from 'express';
import { Consult } from '../models/consult';

import { Message } from '../models/message';
import { Pet } from '../models/pet';
import { Veterinary } from '../models/veterinary';

const collection = "consults";

//--------------------------------------------------------------------------------------------------------////
//-----------------------------------------------Consults CRUD`s------------------------------------------////
//--------------------------------------------------------------------------------------------------------////

export async function createConsult(req:Request, res: Response){         
    try{            
        const newConsult = Consult(req.body);
        const pet = await db.collection('pets').doc(req.body['idpet']).get();
        newConsult.pet = Pet(pet.data());
        const veterinary = await db.collection('veterinaries').doc(req.body['idveterinary']).get();
        newConsult.veterinary = Veterinary(veterinary.data());
        console.log(newConsult);   
        const id = (await db.collection(collection).add(newConsult)).id
        return res.status(201).json(Message('Consult added', `Consult with id: ${id} has been added`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function retrieveConsult(req:Request, res: Response){
    let varId = req.params.id;
    try{
        let doc = await db.collection(collection).doc(varId).get();
        if(!doc){
            return res.status(400).json(Message('Consult does not found',`Consult with id: ${varId} has not found`, 'warning'));
        }
        return res.status(200).json(Consult(doc.data(), doc.id));
    }catch(err){
        return handleError(res, err);
    }   
};

export async function updateConsult(req:Request, res: Response){
    var id = req.params.id;
    try{       
        const consult = Consult(req.body);  
        await db.collection(collection).doc(id).set(consult, {merge: true});
        return res.status(200).json(Message('Consult updated', `Consult with id ${id} has been updated`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function deleteConsult(req:Request, res: Response){
    try{        
        let id = req.params.id;
        await db.collection(collection).doc(id).delete();
        return res.status(200).send(`Consult document with id ${id} was deleted`);
    }
    catch(err){
        return handleError(res, err);
    }
};
export async function listConsult(req:Request, res: Response){ 
    try{
        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page==1?0:(page-1)*limit;
        let snapshot = await db.collection(collection).offset(avoid).limit(limit).get();
        return res.status(200).json(snapshot.docs.map(doc=>Consult(doc.data(), doc.id)));
    }catch(err){
        return handleError(res, err);
    }
};

export async function countConsult(req:Request, res: Response){
    try{
        let snapshot = await db.collection(collection).get();
        return res.status(200).json({numberDocs: snapshot.size});
    }catch(err){
        return handleError(res, err);
    }   
};

//routes.get('/clients/:id/consults', (req, res)=>{
export async function listClientConsult(req:Request, res: Response){ 
    try{
        let id = req.params.id;
        let snapshot = await db.collection(collection).where('idclient','==', id).get();   
        return res.status(200).json(snapshot.docs.map(doc=>Consult(doc.data(), doc.id)));
    }catch(err){
        return handleError(res, err);
    }
}

export async function listPetConsult(req:Request, res: Response){ 
    try{
        let id = req.params.id;
        let snapshot = await db.collection(collection).where('idpet','==', id).get();   
        return res.status(200).json(snapshot.docs.map(doc=>Consult(doc.data(), doc.id)));
    }catch(err){
        return handleError(res, err);
    }
}



function handleError(res: Response, err:any){
    res.status(500).send({message: `${err.code} - ${err.message}`})
}

