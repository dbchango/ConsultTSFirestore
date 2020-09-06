import { Pet } from "./pet"

export interface Vaccine {
    idvaccine?:string,
    date: string,
    name: string, 
    responsable: string,
    observation: string,
    idpet: string,
    pet?:Pet
};

export function Vaccine(data: any, id?: string ){
    const { date, name, responsable, observation, idpet, pet } = data
    let object: Vaccine={
        idvaccine: id, 
        date: date,
        name: name,
        responsable: responsable,
        observation: observation,
        idpet: idpet,
        pet: Pet(pet, pet.id),
    }
    return object
}