import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { Message } from './models/message';

export async function isAuthentificated(req: Request, res:Response, next: Function){
    const { authorization } = req.headers;
    if(!authorization) return res.status(401).json(Message('Unauthorized', 'Without Autorization', 'warning'));
    if(!authorization.startsWith('Bearer')) return res.status(401).json(Message('Unauthorized', 'Invalid token', 'warning'))
    const split = authorization.split('Bearer ')
    if(split.length!==2) return res.status(401).send(Message('Unauthorized','Invalid authorization','warning'))
    const token = split[1]
    try{
        const decodedToken:admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token)
        /*Solo para produccion*/
        //console.log("decodedToken", JSON.stringify(decodedToken));
        res.locals = { ...res.locals, uid:decodedToken.uid, role:decodedToken.role, email: decodedToken.email }
        return next();
    }catch(err){
        console.error(`${err.code} - ${err.message}`)
        return res.status(401).send({message: 'Unauthorized - Unsuccessful token decoding'})
    }
}

export function isAuthorized(opts:{hasRole: Array<'user'|'admin'|'veterinary'>}){
    return (req: Request, res: Response, next: Function)=>{
        const { role } = res.locals
        if (!role) return res.status(403).send(Message( 'Unauthorized','Not valid Role','error'));
        if(opts.hasRole.includes(role)) return next();
        return res.status(403).send(Message( 'Unauthorized','Not valid Role','error'))
    }
}






