import { Client } from "../models/client";
import { Vaccineref } from "./vaccineref";

export interface Pet {
    idpet?:string,
    name: string,
    color: string, 
    age: number,
    idclient: string, 
    type: string,
    sex: string, 
    vaccines: Array<Vaccineref>,
    client?: Client
};

export function Pet(data: any, id?: string){
    const { name, color, age, idclient, type, sex, client, vaccineref } = data;
    let object:Pet={
        idpet: id,
        name: name,
        color: color,
        age: age,
        idclient: idclient,
        type: type,
        sex: sex,
        vaccines: vaccineref,
        client: client
    }
    return object
}
