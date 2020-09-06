import { Client } from "../models/client";
import { VaccineReference } from "./vaccinereference";

export interface Pet {
    idpet?:string,
    name: string,
    color: string, 
    age: number,
    idclient: string, 
    type: string,
    sex: string, 
    vaccines: Array<VaccineReference>,
    client?: Client
};

export function Pet(data: any, id?: string){
    const { name, color, age, idclient, type, sex, client, vaccines } = data;
    let object:Pet={
        idpet: id,
        name: name,
        color: color,
        age: age,
        idclient: idclient,
        type: type,
        sex: sex,
        vaccines: vaccines,
        client: client
    }
    return object
}
