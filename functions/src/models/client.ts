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

export function Client(data: any, id: string){
    const { ci, phone, name, lastname, borndate, direction, gender } = data
    let object: Client = {
        idclient: id,
        ci: ci === undefined ? null : ci,
        phone: phone === undefined ?  null : phone,
        name: name === undefined ?  null : name,
        lastname: lastname === undefined ?  null : lastname,
        borndate: borndate === undefined ?  null : borndate,
        direction: direction === undefined ?  null : direction,
        gender: gender === undefined ?  null : gender,
    }
    return object
}