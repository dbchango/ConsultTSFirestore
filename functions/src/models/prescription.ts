export interface Prescription{
    idmedicne?: string,
    name: string,
    //indications: string,
    price: number,
    description: string
}

export function Prescription(data: any, id?:string){
    const { name, price, description} = data
    let object: Prescription={
        idmedicne: id,
        name: name,
        description: description,
        price: price
    }
    return object;
}