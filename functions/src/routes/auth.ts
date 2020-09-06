import * as Router from 'express';
import * as admin from 'firebase-admin';
import { Message } from '../models/message';

const routes = Router();

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
})
export {routes};





