export interface Veterinary{
    idveterinary?:string,
    ci: string,
    name: string,
    lastname: string,
    phone: string,
    degree: string
    borndate: Date, 
    gender: string,
    direction: string 
}

export function Veterinary(data: any, id?: string){
    const {ci, name, lastname, phone, degree, borndate, gender, direction} = data;
    let object : Veterinary = {
        idveterinary:id,
        ci: ci === undefined ? null : ci,
        name: name === undefined ? null:name,
        lastname: lastname === undefined?null:lastname,
        phone: phone === phone?null:phone,
        degree: degree === undefined?null:degree,
        borndate: borndate === undefined? null:borndate, 
        gender: gender === undefined?null:gender,
        direction: direction === undefined?null:direction 
    }
    return object;
}