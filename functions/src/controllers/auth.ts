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
        return res.status(201).json(Message('Success', `User ${user.displayName} ceated`, 'success'));
    }catch(err){
        return handleError(res, err);
    }
}
/*
routes.post('/auth/signup', async(req, res)=>{
    try{
        const { email, password, displayName, role } = req.body;
        const user = await admin.auth().createUser({
            email, 
            password, 
            displayName 
        });
        await admin.auth().setCustomUserClaims(user.uid, {role});
        res.status(201).json(Message('Success', `User ${user.displayName} ceated`, 'success'));
    }
    catch(err){
        res.status(400).json(Message('An error has ocurred', `${err}`, 'error'))
    }
})*/

function handleError(res: Response, err:any){
    res.status(500).send({message: `${err.code} - ${err.message}`})
}



