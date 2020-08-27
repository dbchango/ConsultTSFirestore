import {db} from '../index';
import {Response, Request} from 'express';
import { Pet } from '../models/pet';
import { Message } from '../models/message';
import { Client } from '../models/client';



const collection = "pets";

//--------------------------------------------------------------------------------------------------------////
//------------------------------------------------Pets CRUD`s --------------------------------------------////
//--------------------------------------------------------------------------------------------------------////
export async function createPet(req:Request, res: Response){          
    try{ 
        const newPet = Pet(req.body);
        let idclient = req.body['idclient'];
        const client = await db.collection('clients').doc(idclient).get();
        newPet.client = Client(client.data());
        const id =  (await db.collection(collection).add(newPet)).id
        return  res.status(201).json(Message('Pet added', `Pet with id: ${id} was added`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function retrievePet(req:Request, res: Response){          
    let id = req.params.id;
    try{
        let doc = await db.collection(collection).doc(id).get();
        if(!doc){
            return res.status(404).json(Message('Pet does not found', `Pet with id: ${id} has not found`, 'warning'))
        }
        return res.status(200).json(Pet(doc.data(), doc.id))
    }catch(err){
        return handleError(res, err);
    }   
};

export async function updatePet(req:Request, res: Response){
    try{       
        var id = req.params.id;
        const pet = Pet(req.body);
        await db.collection(collection).doc(id).set(pet, {merge:true})
        return res.status(200).json(Message('Pet was updated', `Pet with id: ${id} was updated`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function deletePet(req:Request, res: Response){
    try{        
        let id = req.params.id;
        await db.collection(collection).doc(id).delete();
        return res.status(200).json(Message('Pet has been deleted', `Pet with id ${id} was deleted`, 'success'));
    }
    catch(err){
        return handleError(res, err);
    }
};

export async function listPet(req:Request, res: Response){
    try{
        let id = req.params.id;
        let page = parseInt(req.params.page);
        let limit = parseInt(req.params.limit);
        let avoid = page ==1?0:(page-1)*limit;
        if(id===undefined||id===null){
            let snapshot = await db.collection(collection).offset(avoid).limit(limit).get();
            return res.status(200).json(snapshot.docs.map(doc=>Pet(doc.data(), doc.id)));
        }else{
            let snapshot = await db.collection(collection).offset(avoid).limit(limit).get();
            return res.status(200).json(snapshot.docs.map(doc=>Pet(doc.data(), doc.id)));
        }
        
    }catch(err){
        return handleError(res, err);
    }
};

export async function countPet(req:Request, res: Response){
    try{
        let id = req.params.id;
        if(id===undefined||id===null){
            console.log('Id is undefined, so, the api will count all the collection')
            let snapshot = await db.collection(collection).get()    
            return res.status(200).json({numberDocs: snapshot.size})
        }else{
            let snapshot = await db.collection(collection).where('idclient', '==', id).get()    
            return res.status(200).json({numberDocs: snapshot.size})
        }
    }catch(err){
        return handleError(res, err);
    }
    
};

export async function listClientPets(req:Request, res: Response){
    try{
        let id = req.params.id;
        const snapshot = await db.collection(collection).where('idclient','==', id).get();
        return res.status(200).json(snapshot.docs.map(doc=>Pet(doc.data(), doc.id)))
    }catch(err){
        return handleError(res, err)
    }
}

export async function listPets(req:Request, res: Response){
    try{
        const snapshot = await db.collection(collection).get();
        return res.status(200).json(snapshot.docs.map(doc=>Pet(doc.data(), doc.id)))
    }catch(err){
        return handleError(res, err)
    }
}

function handleError(res: Response, err:any){
    res.status(500).send({message: `${err.code} - ${err.message}`})
}

