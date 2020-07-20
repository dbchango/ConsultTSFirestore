/*import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';

const routes = Router();
const db = main.db;
const collection = "pettypes";

interface PetType {
    idpettype?: string,
    name: string
}

////------------------------------------------------------------------------------------------------------////
///---------------------------------------------Methods---------------------------------------------------////
//--------------------------------------------------------------------------------------------------------////

function getPetType(id: string, data:any){
    let object: PetType = {
        idpettype: id,
        name: data.name
    }
    return object
}

//--------------------------------------------------------------------------------------------------------////
//-----------------------------------------------Pet Types CRUD`s-----------------------------------------////
//--------------------------------------------------------------------------------------------------------////

routes.post('/pettypes', async (req, res) => {           
    try{            
        const newPetType : PetType = {
            name: req.body['name']
        };      
        const petTypeAdded = await firebaseHelper.firestore
                                .createNewDocument(db, collection, newPetType);
        res.status(201).json(main.Message('Pet added', `Pet type was added with id: ${petTypeAdded.id}`, 'success'));
    }
    catch(err){
        res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error'))
    }
});

routes.get('/pettypes/:id', (req,res)=>{    
    firebaseHelper.firestore
        .getDocument(db, collection, req.params.id)
        .then(doc => res.status(200).json(getPetType(doc.id, doc)))
        .catch(err => res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error')));
});

routes.put('/pettypes/:id', async(req, res) => {
    try{       
        var id = req.params.id;
        const pettype : PetType = {
            name: req.body['name']
        }; 
        await firebaseHelper.firestore.updateDocument(db, collection, id, pettype);
        res.status(200).json(main.Message('Pet type was added', `Pet type with id ${id} was updated`, 'success'));
    }
    catch(err){
        res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error'));
    }
});

routes.delete('/pettypes/:id', async (request, response) => {
    try{        
        let id = request.params.id;
        await firebaseHelper.firestore.deleteDocument(db, collection, id);
        response.status(200).json(main.Message('Pet type was added', `Pet type with id ${id} was deleted`, 'success'));
    }
    catch(err){
        response.status(400).json(main.Message('An error has ocurred', `${err}`, 'error'));
    }
});

routes.get('/pettypes', (req, res) =>{     
    firebaseHelper.firestore.backup(db, collection)
        db.collection(collection).get()
        .then(
            snapshot=>{
                res.status(200).json(snapshot.docs.map(doc=>getPetType(doc.id, doc.data())))
            }
        ).catch(err => res.status(400).json(main.Message('An error has ocurred', `${err}`, 'error')));
});

export { routes };
*/
