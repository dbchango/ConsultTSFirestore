import { db } from '../index';;
import { Request, Response } from 'express';
import { Veterinary } from '../models/veterinary';
import { Message } from '../models/message';

const collection ='veterinaries';

export async function createVeterinary(req:Request, res: Response){
    try{
        const newVeterinar = Veterinary(req.body);
        const veterinaryAdded = await (await db.collection(collection).add(newVeterinar));         
        return res.status(201).json(Message('Veterinary added', `Veterinary added with id: ${veterinaryAdded.id}`, 'success'))
    }catch(err){
        return handleError(res, err);
    }
} 

export async function retrieveVeterinary(req:Request, res: Response){
    let varId = req.params.id;
    try{
        let doc = await db.collection(collection).doc(varId).get();
        if(!doc){
            return res.status(404).json(Message('Veterinary does not found', `Veterinary with id: ${varId} has not found`, 'warning'));
        }
        return res.status(200).json(Veterinary(doc.data(), doc.id));
    }catch(err){
        return handleError(res, err);
    }
};


export async function updateVeterinary(req:Request, res: Response){
    try{
        const veterinary = Veterinary(req.body); 
        await db.collection(collection).doc(req.params.id).set(veterinary, {merge:true});
        return res.status(201).json(Message('Veterinary updated', `Veterinary with id: ${req.params.id} has been updated`, 'success'));
    }catch(err){
        return handleError(res, err);
    }
};

export async function deleteVeterinary(req:Request, res: Response){
    let varId = req.params.id;
    try{
        await db.collection(collection).doc(varId).delete();
        return res.status(201).json(Message('Veterinary deleted', `Veterinary with id:${varId} has been deleted`,'success' ))
    }catch(err){
        return handleError(res, err);
    }
};

export async function listVeterinary(req:Request, res: Response){
    try{
        //var last:number = parseInt(req.params.last);
        //var limit:number = parseInt(req.params.limit);
        const snapshot = await db.collection(collection).get();
        return res.status(200).json(snapshot.docs.map(doc=>Veterinary(doc.data(), doc.id)));
    }catch(err){
        return handleError(res, err);
    }
};

function handleError(res: Response, err:any){
    res.status(500).send({message: `${err.code} - ${err.message}`})
}

