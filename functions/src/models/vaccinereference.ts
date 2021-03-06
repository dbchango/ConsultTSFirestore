export interface VaccineReference{
    idvaccine?:string,
    date: string,
    name: string, 
    description: string,
};

export function Vaccineref(data: any, id?: string ){
    const { date, name, description } = data
    let object: VaccineReference={
        idvaccine: id, 
        date: date,
        name: name,
        description: description
    }
    return object
}