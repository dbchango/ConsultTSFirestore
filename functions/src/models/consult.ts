import { Client } from "./client";
import { Pet } from "./pet";
import { Veterinary } from "./veterinary";

export interface Consult {
    idconsult?: string;
    date: string,
    observation: string,
    price: number,
    status: number, 
    idpet: string,
    idclient: string,
    idveterinary: string,
    pet?: Pet,
    client?: Client,
    veterinary?: Veterinary
}

export function Consult(data: any, id?: string){
    const { observation, price, status, idpet, idclient, idveterinary, pet, client, veterinary } = data;
    let object : Consult = {
        idconsult: id,
        date: new Date().toDateString(),
        observation: observation,
        price: price,
        status: status,
        idpet: idpet,
        idclient: idclient,
        idveterinary: idveterinary,
        pet: pet,
        client: client, 
        veterinary: veterinary
    }
    return object;
}

export function setStatus(status:number){
    if(status===1){
        return 
    }
}
