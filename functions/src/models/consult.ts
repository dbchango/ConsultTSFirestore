import { Client } from "./client";
import { Pet } from "./pet";
import { Veterinary } from "./veterinary";

export interface Consult {
    idconsult?: string;
    date: string,
    observation: string,
    price: number,
    responsable: string,
    status: number, 
    idpet: string,
    idclient: string
    pet?: Pet,
    client?: Client,
    veterinary?: Veterinary
}

export function Consult(data: any, id?: string){
    const { observation, price, responsable, status, idpet, idclient, pet, client } = data;
    let object : Consult = {
        idconsult: id,
        date: new Date().toDateString(),
        observation: observation,
        price: price,
        responsable: responsable,
        status: status,
        idpet: idpet,
        idclient: idclient,
        pet: Pet(pet, pet.id),
        client: Client( client, client.id)
    }
    return object;
}

export function setStatus(status:number){
    if(status===1){
        return 
    }
}
