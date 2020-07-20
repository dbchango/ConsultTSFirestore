import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';


const routes = Router();
const db = main.db;
const collection = "clients";

interface Client {
    idclient?: string,
    ci: string,
    phone: string,
    name: string,
    lastname: string,
    borndate: Date, 
    direction: string,
    gender: string
};

////------------------------------------------------------------------------------------------------------////
///---------------------------------------------Methods---------------------------------------------------////
//--------------------------------------------------------------------------------------------------------////

function getClient(id: string, data: any){
    let object: Client = {
        idclient: id,
        ci: data.ci,
        phone: data.phone,
        name: data.name,
        lastname: data.lastname,
        borndate: data.borndate,
        direction: data.direction,
        gender: data.gender,
    }
    return object
}
//--------------------------------------------------------------------------------------------------------////
//------------------------------------------------Clients CRUD`s------------------------------------------////
//--------------------------------------------------------------------------------------------------------////
routes.post('/clients', async(req, res)=>{
    try{
        const newClient : Client ={
            ci: req.body["ci"],
            phone: req.body["phone"],
            borndate: req.body["borndate"],
            name: req.body["name"],
            lastname: req.body["lastname"],
            direction: req.body["direction"],
            gender: req.body["gender"]
        };     
        const clientAdded = await firebaseHelper.firestore
                                .createNewDocument(db, collection, newClient);
        res.status(201).json(main.Message('Client added', `Client was added with id: ${clientAdded.id}`, 'success'));
    }catch(err){
        res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error'));
    }
});

//Search a doc by id
routes.get('/clients/:id', async(req, res)=>{
    let varId = req.params.id;
        await db.collection(collection).doc(varId).get()
        .then(
            doc=>{
                res.status(200).json(getClient(doc.id, doc.data()));
            }
        ).catch(err => res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error')));
        /*
        await firebaseHelper.firestore.getDocument(db, collection, varId)
        .then(doc =>  res.status(200).json(getClient(req.params.id, doc))
        ).catch(err => res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error')));*/

});

//Modify docs by id
routes.put('/clients/:id', async(req, res)=>{
    try{
        var id = req.params.id;
        const newClient : Client ={
            ci: req.body["ci"] === undefined ? null : req.body["ci"],
            phone: req.body["phone"]=== undefined ? null :req.body["phone"],
            borndate: req.body["borndate"] === undefined ? null :req.body["borndate"], 
            name: req.body["name"] === undefined ? null :req.body["name"],
            lastname: req.body["lastname"]=== undefined ? null :req.body["lastname"],
            direction: req.body["direction"] === undefined ? null :req.body["direction"],
            gender: req.body["gender"]=== undefined ? null:req.body["gender"]
        };      
        await firebaseHelper.firestore.updateDocument(db, collection, id, newClient);
        res.status(201).json(main.Message('Client updated', `Client with id: ${id} has been updated`, 'success'));
    }catch(err){
        res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error'));
    }
});

//Delete clients by id
routes.delete('/clients/:id', async(req, res)=>{
    let varId = req.params.id;
    try{
        await firebaseHelper.firestore.deleteDocument(db, collection, varId);
        res.status(201).json(main.Message('Client deleted', `Client with id:${varId} has been deleted`,'success' ))
    }catch(err){
        res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error'));
    }
});

//List collection`s docs
routes.get('/clients', (req, res)=>{
    db.collection(collection).get().then(
        snapshot=>{
        res.status(200).json(snapshot.docs.map(doc=>getClient(doc.id, doc.data())));
    }).catch(err=>res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error')));
});

export { routes };