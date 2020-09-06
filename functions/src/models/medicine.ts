export interface Medicine{
    idmedicine?: string,
    name: string,
    price: number, 
    presentation: string,
    description: string,
    composition: string
}

export function Medicine(data: any, id?:string){
    const { name, price, presentation, description, composition } = data;
    let object: Medicine = {
        idmedicine: id,
        name: name,
        price: price, 
        presentation: presentation,
        description: description,
        composition: composition
    }
    return object;
}