import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';


const routes = Router();
const db = main.db;
const collection = "pets";

interface Pet {
    name: string,
    color: string, 
    age: number,
    idClient: string, 
    idType: string,
    sex: string
};

interface Vaccine {
    date: Date,
    name: string, 
    responsable: string,
    observation: string
};




routes.post('/pets', async (req, res) => {           
    try{            
        const newPet : Pet = {
            name: req.body['name'],
            color: req.body['color'],
            age: req.body['age'],
            idClient: req.body['idClient'],
            idType: req.body['idType'],
            sex: req.body["sex"],
        };      
        
        const petAdded = await firebaseHelper.firestore
                                .createNewDocument(db, collection, newPet);
        res.status(201).send(`Pet was added to collection with id ${petAdded.id}`);
                
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`)
    }
});

routes.get('/pets/:id', (req,res)=>{    
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).send(doc))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
        
});

routes.patch('/pets/:id', async(req, res) => {
    try{       
        var id = req.params.id;
        const pet : Pet = {
            name: req.body['name'],
            color: req.body['color'],
            age: req.body['age'],
            idClient: req.body['idClient'],
            idType: req.body['idType'],
            sex: req.body["sex"]
        }; 
        await firebaseHelper.firestore.updateDocument(db, collection, id, pet);
        res.status(200).send(`Pet with id ${id} was updated`);
    }
    catch(err){
        res.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.delete('/pets/:id', async (request, response) => {
    try{        
        let id = request.params.id;
        await firebaseHelper.firestore.deleteDocument(db, collection, id);
        response.status(200).send(`Pet document with id ${id} was deleted`);
    }
    catch(err){
        response.status(400).send(`An error has ocurred ${err}`);
    }
});

routes.get('/pets', (req, res) =>{     
    firebaseHelper.firestore.backup(db, collection)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

routes.post('/pets/:id/vaccines', async(req, res)=>{
    let varId = req.params.id;
    const newVaccine : Vaccine = {
        date: new Date(),
        name: req.body['body'],
        observation: req.body['observation'],
        responsable: req.body['responsable']
    };
    let docPet = db.collection(collection).doc(varId);
    docPet.collection('vaccines').add(newVaccine).then(vaccineAdded => {
        res.status(201).send(`Vaccine was added with id ${vaccineAdded.id}`);

    }).catch(err=>{
        res.status(400).send(`An error has ocurred ${err}`);
    });
});

routes.get('/pets/:id/vaccines/:idVacc', (req, res)=>{
    var petRef = db.collection(collection).doc(req.params.id).collection('vaccines').doc(req.params.idVacc);
    petRef.get().then( doc => {
        res.status(201).send(doc.data())
    }).catch(err=> res.status(400).send(`An error has ocurred ${err}`));
    
});

routes.get('/pets/:id/vaccines', async(req, res) => {
    var vaccslist = db.collection(collection).doc(req.params.id).collection("vaccines");
    vaccslist.get().then( list => {
        res.status(201).send(list.docs.map(doc => doc.data()))
    }).catch(err=> res.status(400).send(`An error has ocurred ${err}`));

});

routes.delete('/pets/:id/vaccines/:idVacc', async(req, res) => {
    var deleVacc = db.collection(collection).doc(req.params.id).collection('vaccines').doc(req.params.idVacc);
    deleVacc.delete().then(doc => {
        res.status(201).send(`Vaccine was deleted ${doc}`)
    }).catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

export { routes };

