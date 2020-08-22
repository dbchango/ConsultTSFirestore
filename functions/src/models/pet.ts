export interface Pet {
    idpet?:string,
    name: string,
    color: string, 
    age: number,
    idclient: string, 
    type: string,
    sex: string
};

export function Pet(data: any, id?: string){
    const { name, color, age, idclient, type, sex } = data;
    let object:Pet={
        idpet: id,
        name: name,
        color: color,
        age: age,
        idclient: idclient,
        type: type,
        sex: sex
    }
    return object
}
