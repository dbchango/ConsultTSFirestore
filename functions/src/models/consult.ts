
import { Pet } from "./pet";
import { Veterinary } from "./veterinary";
import { Prescription } from "./prescription";

export interface Consult {
    idconsult?: string;
    date: string,
    observation: string,
    price: number,
    status: number, 
    prescription: Array<Prescription>,
    idpet: string,
    idveterinary: string,
    pet?: Pet,
    veterinary?: Veterinary
}

export function Consult(data: any, id?: string){
    const { observation, price, status, prescription, idpet, idveterinary, pet, veterinary } = data;
    let object : Consult = {
        idconsult: id,
        date: new Date().toDateString(),
        observation: observation,
        prescription: prescription,
        price: price,
        status: status,
        idpet: idpet,
        idveterinary: idveterinary,
        pet: pet,
        veterinary: veterinary
    }
    return object;
}

export function setStatus(status:number){
    if(status===1){
        return 
    }
}
