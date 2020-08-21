///---------------------------------------------MODELS---------------------------------------------------////

///---------------------------------------------Client---------------------------------------------------////
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

///---------------------------------------------Consult---------------------------------------------------////

export interface Consult {
    idconsult?: string;
    date: string,
    observation: string,
    price: number,
    responsable: string,
    status: number, 
    idpet: string,
    idclient: string
    pet?: Pet,
    client?: Client
}

export function Consult(id: string, data: any){
    let object : Consult = {
        idconsult: id,
        date: data.date,
        observation: data.observation,
        price: data.price,
        responsable: data.responsable,
        status: data.status,
        idpet: data.idpet,
        idclient: data.idclient,
        pet: Pet(data.pet.id, data.pet),
        client: Client( data.client, data.client.id)
    }
    return object;
}

export function setStatus(status:number){
    if(status===1){
        return 
    }
}

///---------------------------------------------Pet---------------------------------------------------////

export interface Pet {
    idpet?:string,
    name: string,
    color: string, 
    age: number,
    idclient: string, 
    type: string,
    sex: string
};

export function Pet(id: string, data: any){
    let object:Pet={
        idpet: id,
        name: data.name,
        color: data.color,
        age: data.age,
        idclient: data.idclient,
        type: data.type,
        sex: data.sex
    }
    return object
}

///---------------------------------------------Vaccine---------------------------------------------------////

export interface Vaccine {
    idvaccine?:string,
    date: string,
    name: string, 
    responsable: string,
    observation: string,
    idpet: string,
    pet?:Pet
};

export function Vaccine(id: string, data: any){
    let object: Vaccine={
        idvaccine: id, 
        date: data.date,
        name: data.name,
        responsable: data.responsable,
        observation: data.observation,
        idpet: data.idpet,
        pet: Pet(data.pet.id, data.pet),
    }
    return object
}
///---------------------------------------------Message---------------------------------------------------////
export interface Message {
    title: string,
    text: string,
    icon: string
  };
  
export function Message(title: string, text: string, icon: string){
    let message :  Message = {
      title: title,
      text: text,
      icon: icon
    }
    return message
  }
