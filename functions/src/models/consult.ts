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

export function Consult(id: string, data: any){
    let object : Consult = {
        idconsult: id,
        date: data.date,
        observation: data.observation,
        price: data.price,
        responsable: data.responsable,
        status: data.status,
        idpet: data.idpet,
        idclient: data.idclient,
        pet: Pet(data.pet.id, data.pet),
        client: Client( data.client, data.client.id)
    }
    return object;
}

export function setStatus(status:number){
    if(status===1){
        return 
    }
}
