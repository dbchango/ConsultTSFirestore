export interface Vaccine {
    idvaccine?:string,
    name: string, 
    description: string,
    brand: string
};

export function Vaccine(data: any, id?: string ){
    const { name, description, brand } = data
    let object: Vaccine={
        idvaccine: id,
        name: name,
        description: description,
        brand: brand
    }
    return object
}