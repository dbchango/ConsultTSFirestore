import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const routes = Router();
const db = main.db;
const collection = "pets";

interface Pet {
    idpet?:string,
    name: string,
    color: string, 
    age: number,
    idclient: string, 
    type: string,
    sex: string
};

interface Vaccine {
    idvaccine?:string,
    date: String,
    name: string, 
    responsable: string,
    observation: string
};

////------------------------------------------------------------------------------------------------------////
///---------------------------------------------Methods---------------------------------------------------////
//--------------------------------------------------------------------------------------------------------////

function getPet(id: string, data: any){
    let object:Pet={
        idpet: id,
        name: data.name,
        color: data.color,
        age: data.age,
        idclient: data.idclient,
        type: data.type,
        sex: data.sex
    }
    return object
}

function getVaccine(id: string, data: any){
    let object: Vaccine={
        idvaccine: id, 
        date: data.date,
        name: data.name,
        responsable: data.responsable,
        observation: data.observation
    }
    return object
}
/*
function getTypw(id: string){
    return db.collection('types').doc(id).get()
    .then(result=>{
        
    })

}
*/
//--------------------------------------------------------------------------------------------------------////
//------------------------------------------------Pets CRUD`s --------------------------------------------////
//--------------------------------------------------------------------------------------------------------////
routes.post('/pets', async (req, res) => {           
    try{      
        const newPet : Pet = {
            name: req.body['name'],
            color: req.body['color'],
            age: req.body['age'],
            idclient: req.body['idclient'],
            type: req.body['type'],
            sex: req.body["sex"],
        };      
        const petAdded = await firebaseHelper.firestore
                                .createNewDocument(db, collection, newPet);
        res.status(201).json(main.Message('Pet added', `Pet with id: ${petAdded.id} was added`, 'error'));
    }
    catch(err){
        res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error'))
    }
});

routes.get('/pets/:id', (req,res)=>{    
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).json(getPet(doc.id, doc)))
        .catch(err => res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error')));
});

routes.put('/pets/:id', async(req, res) => {
    try{       
        var id = req.params.id;
        const pet : Pet = {
            name: req.body['name']===undefined?null:req.body['name'],
            color: req.body['color']===undefined?null:req.body['color'],
            age: req.body['age']===undefined?null:req.body['age'],
            idclient: req.body['idclient']===undefined?null:req.body['idclient'],
            type: req.body['type']===undefined?null:req.body['type'],
            sex: req.body["sex"]===undefined?null:req.body["sex"]
        }; 
        await firebaseHelper.firestore.updateDocument(db, collection, id, pet);
        res.status(200).json(main.Message('Pet was updated', `Pet with id: ${id} was updated`, 'success'));
    }
    catch(err){
        res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error'));
    }
});

routes.delete('/pets/:id', async (request, response) => {
    try{        
        let id = request.params.id;
        await firebaseHelper.firestore.deleteDocument(db, collection, id);
        response.status(200).json(main.Message('Pet has been deleted', `Pet with id ${id} was deleted`, 'success'));
    }
    catch(err){
        response.status(400).json(main.Message('An error has ocurred', `${err}`, 'error'));
    }
});

routes.get('/pets', (req, res) =>{     
    db.collection(collection).get()
    .then(snapshot=>{
        res.status(200).json(snapshot.docs.map(doc=>getPet(doc.id, doc.data())));
    })
    .catch(err=>res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error')));
});
//--------------------------------------------------------------------------------------------------------////
//------------------------------------------------Vaccine CRUD`s------------------------------------------////
//--------------------------------------------------------------------------------------------------------////
routes.post('/pets/:id/vaccines', async(req, res)=>{
    let varId = req.params.id;
    const newVaccine : Vaccine = {
        date: new Date().toDateString(),
        name: req.body['body'],
        observation: req.body['observation'],
        responsable: req.body['responsable']
    };
    let docPet = db.collection(collection).doc(varId);
    docPet.collection('vaccines').add(newVaccine).then(vaccineAdded => {
        res.status(201).json(main.Message('Vaccine was added', `Vaccine with id: ${vaccineAdded.id} was added`, 'success'));

    }).catch(err=>{
        res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error'));
    });
});

routes.get('/pets/:id/vaccines/:idVacc', (req, res)=>{
    var petRef = db.collection(collection).doc(req.params.id).collection('vaccines').doc(req.params.idVacc);
    petRef.get().then( doc => {
        res.status(201).json(getVaccine(doc.id, doc.data()))
    }).catch(err=> res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error')));
});

routes.put('/pets/:id/vaccines/:idVacc', async(req, res) => {
    const newVaccine : Vaccine = {
        date: new Date().toDateString(),
        name: req.body['name']===undefined?null:req.body['name'],
        observation: req.body['observation']===undefined?null:req.body['observation'],
        responsable: req.body['responsable']===undefined?null:req.body['responsable']
    };
    db.collection(collection).doc(req.params.id).collection('vaccines').doc(req.params.idVacc).set(newVaccine)
    .then(doc => res.status(200).json(main.Message('Vaccine was updeted', `Vaccine with id: ${req.params.idVacc} was updated`, 'success')))
    .catch(err => res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error')));
        
});

routes.delete('/pets/:id/vaccines/:idVacc', async(req, res) => {

    try{
        await db.collection(collection).doc(req.params.id).collection('vaccines').doc(req.params.idVacc).delete();
        res.status(201).json(main.Message('Vaccine deleted', `Vaccine with ${req.params.idVacc} was deleted`, 'success'))
    }catch(err){
        res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error'))
    }
/*
    var deleVacc = db.collection(collection).doc(req.params.id).collection('vaccines').doc(req.params.idVacc);
    deleVacc.delete().then(doc => {
        res.status(201).json(main.Message('Vaccine deleted', `Vaccine with ${doc.id} was deleted`, 'success'))
    }).catch(err => res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error')));
    */
});

routes.get('/pets/:id/vaccines', async(req, res) => {
    db.collection(collection).doc(req.params.id).collection("vaccines").get()
    .then( snapshot => {
        res.status(201).json(snapshot.docs.map(doc => getVaccine(doc.id, doc.data())))
    }).catch(err=> res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error')));

});

export { routes };

