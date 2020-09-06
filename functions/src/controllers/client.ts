import { db } from '../index';
import {Request, Response} from 'express';
import { Client } from '../models/client';
import { Message } from '../models/message';


const collection = "clients";

//--------------------------------------------------------------------------------------------------------////
//------------------------------------------------Clients CRUD`s------------------------------------------////
//--------------------------------------------------------------------------------------------------------////
export async function createClient(req:Request, res: Response){
    try{
        const newClient = Client(req.body); 
        const clientAdded = await (await db.collection(collection).add(newClient));         
        return res.status(201).json(Message('Client added', `Client was added with id: ${clientAdded.id}`, 'success'));
    }catch(err){
        return handleError(res, err);
    }
} 

//Search a doc by id
export async function retrieveClient(req:Request, res: Response){
    let varId = req.params.id;
    try{
        let doc = await db.collection(collection).doc(varId).get();
        if(!doc){
            return res.status(404).json(Message('Client does not found', `Client with id: ${varId} has not found`, 'warning'));
        }
        return res.status(200).json(Client(doc.data(), doc.id ));
    }catch(err){
        return handleError(res, err);
    }
};

//Modify docs by id
export async function updateClient(req:Request, res: Response){
    try{
        const client = Client(req.body); 
        await db.collection(collection).doc(req.params.id).set(client, {merge:true});
        return res.status(201).json(Message('Client updated', `Client with id: ${req.params.id} has been updated`, 'success'));
    }catch(err){
        return handleError(res, err);
    }
};

//Delete clients by id
export async function deleteClient(req:Request, res: Response){
    let varId = req.params.id;
    try{
        await db.collection(collection).doc(varId).delete();
        return res.status(201).json(Message('Client deleted', `Client with id:${varId} has been deleted`,'success' ))
    }catch(err){
        return handleError(res, err);
    }
};

//List collection`s docs/*
export async function listClients(req:Request, res: Response){
    try{
        var last:number = parseInt(req.params.last);
        var limit:number = parseInt(req.params.limit);
        const snapshot = await db.collection(collection).limit(limit).offset(last).get();
        return res.status(200).json(snapshot.docs.map(doc=>Client(doc.data(), doc.id)));
    }catch(err){
        return handleError(res, err);
    }
};

export async function countClient(req:Request, res: Response){
    try{
        const snapshot = await db.collection(collection).get();
        return res.status(200).json({numberDocs: snapshot.size});
    }catch(err){
        return handleError(res, err);
    }
};

export async function listClient(req:Request, res: Response){
    try{
        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page == 1 ? 0 : (page - 1) * limit;
        let snapshot = await db.collection(collection).orderBy('lastname').offset(avoid).limit(limit).get();
        return res.status(200).json(snapshot.docs.map(doc => Client(doc.data(), doc.id)));
    }catch(err){
        return handleError(res, err);
    }
    
}




//list codes by interval
function handleError(res: Response, err:any){
    res.status(500).send({message: `${err.code} - ${err.message}`})
}
