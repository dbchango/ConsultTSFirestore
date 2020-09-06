export interface Client {
    idclient?: string,
    ci: string,
    phone: string,
    name: string,
    lastname: string,
    borndate: Date, 
    direction: string,
    gender: string,
    created_by?: string,
    creation_date: string
};

export function Client(data: any, id?: string, username?: string){
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
        created_by: username,
        creation_date: new Date().toUTCString()
    }
    return object
}