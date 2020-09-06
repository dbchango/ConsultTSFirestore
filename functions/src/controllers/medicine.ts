import { db } from '../index';
import { Request, Response } from 'express';
import { Medicine } from '../models/medicine';
import { Message } from '../models/message';

const collection = "medicines";

export async function createMedicine(req: Request, res: Response){
    try{
        const medicine = Medicine(req.body);
        let idMedicine = (await db.collection(collection).add(medicine)).id
        return res.status(201).json(Message('Medicine added', `Medicine added with id: ${idMedicine}`, 'success'));
    }catch(err){
        return handleError(res, err);
    }
}

export async function retrieveMedicine(req: Request, res: Response){
    try{
        let id = req.params.id;
        const doc = await db.collection(collection).doc(id).get();
        if(!doc){
            return res.status(404).json(Message('Medicine dos not found', `Medicine with od ${id} has nos found`, 'warning'));
        }
        return res.status(200).json(Medicine(doc.data(), doc.id));
    }catch(err){
        return handleError(res, err);
    }
}

export async function updateMedicine(req: Request, res: Response){
    try{
        let id = req.params.id;
        const newMedicine = Medicine(req.body);
        db.collection(collection).doc(id).set(newMedicine, {merge:true});
        return res.status(201).json(Message('Medicine was updeted', `Vaccine with id: ${req.params.id} was updated`, 'success'));
    }catch(err){
        return handleError(res, err)
    }
}

export async function deleteMedicine(req: Request, res: Response){
    try{
        let id = req.params.id;
        await db.collection(collection).doc(id).delete();
        return res.status(201).json(Message('Medicine deleted', `Medicine with id: ${id} was deleted`, 'success'))
    }catch(err){
        return handleError(res, err);
    }
}

export async function listMedicine(req: Request, res: Response){
    try{
        const snapshot = await db.collection(collection).get();
        return res.status(200).json(snapshot.docs.map(doc=>Medicine(doc.data(), doc.id)))
    }catch(err){
        return handleError(res, err)
    }
}

function handleError(res: Response, err:any){
    res.status(500).send({message: `${err.code} - ${err.message}`})
}


