export interface Veterinary{
    idveterinary?:string,
    ci: string,
    name: string,
    lastname: string,
    phone: string,
    degree: string
    borndate: string, 
    gender: string,
    direction: string 
}

export function Veterinary(data: any, id?: string){
    const {ci, name, lastname, phone, degree, borndate, gender, direction} = data;
    let object : Veterinary = {
        idveterinary:id,
        ci:ci,
        name: name,
        lastname: lastname,
        phone: phone,
        degree: degree,
        borndate: borndate, 
        gender: gender,
        direction: direction
    }
    return object;
}