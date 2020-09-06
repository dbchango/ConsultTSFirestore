export interface Client {
    idclient?: string,
    ci: string,
    phone: string,
    name: string,
    lastname: string,
    borndate: Date, 
    direction: string,
    gender: string
};

export function Client(data: any, id?: string){
    const { ci, phone, name, lastname, borndate, direction, gender } = data
    let object: Client = {
        idclient: id,
        ci: ci,
        phone: phone,
        name: name,
        lastname: lastname,
        borndate: borndate,
        direction: direction,
        gender: gender,
    }
    return object
}