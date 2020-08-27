import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { Message } from '../models/message';


export async function signup(req: Request, res:Response){
    try{
        const { email, password, displayName, role } = req.body;
        const user = await admin.auth().createUser({
            email, 
            password, 
            displayName 
        });
        await admin.auth().setCustomUserClaims(user.uid, {role});
        return res.status(201).json(Message('Success', `User ${user.displayName} created`, 'success'));
    }catch(err){
        return handleError(res, err);
    }
}

function handleError(res: Response, err:any){
    res.status(500).send({message: `${err.code} - ${err.message}`})
}



