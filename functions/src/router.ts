import { Application } from 'express';
import { createClient, retrieveClient, updateClient, deleteClient, listClients } from './controllers/client';
import { createVaccine, retrieveVaccine, updateVaccine, deleteVaccine, listVaccine } from './controllers/vaccine';
import { createPet, retrievePet, updatePet, deletePet, countPet, listPet } from './controllers/pet';
import { createVeterinary, retrieveVeterinary, updateVeterinary, deleteVeterinary, listVeterinary } from './controllers/veterinary';
import { createConsult, retrieveConsult, updateConsult, deleteConsult, listConsult, listClientConsult } from './controllers/consult';

export function routesClient(app:Application){
    app.post('/api/clients', createClient);
    app.get('/api/clients/:id', retrieveClient);
    app.put('/api/clients/:id', updateClient);
    app.delete('/api/clients/:id', deleteClient);
    app.get('/api/clients/interval/:limit/:last', listClients);
    app.get('/api/clients/:id/consults/:limit/:last', listClientConsult);
}

export function routesConsults(app: Application){   
    app.post('/api/consults', createConsult);
    app.get('/api/consults/:id', retrieveConsult);
    app.put('/api/consults/:id', updateConsult);
    app.delete('/api/consults/:id', deleteConsult);
    app.get('/api/consults/interval/:limit/:last', listConsult);
}

export function routesVaccines(app:Application){
    app.post('/api/vaccines', createVaccine);
    app.get('/api/vaccines/:id', retrieveVaccine);
    app.put('/api/vaccines/:id', updateVaccine);
    app.delete('/api/vaccines/:id', deleteVaccine);
    app.get('/api/vaccines', listVaccine);
}

export function routesVeterineries(app: Application){
    app.post('/api/veterinaries', createVeterinary);
    app.get('/api/veterinaries/:id', retrieveVeterinary);
    app.put('/api/veterinaries/:id', updateVeterinary);
    app.delete('/api/veterinaries/:id', deleteVeterinary);
    app.get('/api/veterinaries', listVeterinary);
}

export function routesPet(app: Application){
    app.post('/api/pets', createPet);
    app.get('/api/pets/:id', retrievePet);
    app.put('/api/pets/:id', updatePet);
    app.delete('/api/pets/:id', deletePet);
    app.get('/api/clients/pets/:id', countPet);
    app.get('/api/clients/:id/pets/page/:page/:limit', listPet);
}
