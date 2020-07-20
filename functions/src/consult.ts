import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const routes = Router();
const db = main.db;
const collection = "consults";

interface Consult {
    idconsult?: string;
    date: String,
    observation: string,
    price: number,
    responsable: string,
    status: number, 
    idpet: string,
    idclient: String
}

////------------------------------------------------------------------------------------------------------////
///---------------------------------------------Methods---------------------------------------------------////
//--------------------------------------------------------------------------------------------------------////

function getConsult(id: string, data: any){
    let object : Consult = {
        idconsult: id,
        date: data.date,
        observation: data.observation,
        price: data.price,
        responsable: data.responsable,
        status: data.status,
        idpet: data.idpet,
        idclient: data.idclient
    }
    return object;
}


//--------------------------------------------------------------------------------------------------------////
//-----------------------------------------------Consults CRUD`s------------------------------------------////
//--------------------------------------------------------------------------------------------------------////

routes.post('/consults', async (req, res) => {           
    try{            
        
        const newConsult : Consult = {
            date: new Date().toDateString(),
            observation: req.body['observation'],
            price: req.body['price'],
            idpet: req.body['idpet'],
            idclient: req.body['idclient'],
            responsable: req.body['responsable'],
            status: req.body["status"]
        };      
        const consAdded = await firebaseHelper.firestore
                                .createNewDocument(db, collection, newConsult);
        res.status(201).json(main.Message('Consult added', `Consult with id: ${consAdded.id} has been added`, 'success'));
    }
    catch(err){
        res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error'))
    }
});

routes.get('/consults/:id', (req,res)=>{    
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).json(getConsult(doc.id, doc)))
        .catch(err => res.status(400).json(main.Message('An error has ocured',`${err}`, 'error')));
});

routes.put('/consults/:id', async(req, res) => {
    try{       
        var id = req.params.id;
        const consult : Consult = {
            date: new Date().toDateString(),
            observation: req.body['observation']===undefined?null:req.body['observation'],
            price: req.body['price']===undefined?null:req.body['price'],
            idpet: req.body['idpet']===undefined?null:req.body['idpet'],
            idclient: req.body['idclient']===undefined?null:req.body['idclient'],
            responsable: req.body['responsable']===undefined?null:req.body['responsable'],
            status: req.body["status"]===undefined?null:req.body["status"]
        };      
        await firebaseHelper.firestore.updateDocument(db, collection, id, consult);
        res.status(200).json(main.Message('Consult updated', `Consult with id ${id} has been updated`, 'success'));
    }
    catch(err){
        res.status(400).json(main.Message('An error has ocured',`${err}`, 'error'));
    }
});

routes.delete('/consults/:id', async (request, response) => {
    try{        
        let id = request.params.id;
        await firebaseHelper.firestore.deleteDocument(db, collection, id);
        response.status(200).send(`Consult document with id ${id} was deleted`);
    }
    catch(err){
        response.status(400).json(main.Message('An error has ocured',`${err}`, 'error'));
    }
});

routes.get('/consults', (req, res) =>{     
    db.collection(collection).get()
    .then(
        snapshot => {
            res.status(200).json(snapshot.docs.map(doc=>getConsult(doc.id, doc.data())));
        }
    ).catch(err=>{
        res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error'))
    });
});

export { routes };

