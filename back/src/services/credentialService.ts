import { EntityManager } from "typeorm";
import { CredentialModel } from "../Config/data-source";
import { Credential } from "../entities/CredentialsEntities";
import { ICredential } from "../interfaces/CredentialInterface";
const credentialsList: ICredential[] = []


const crypPass = async (text: string): Promise<string> => {


    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hash = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hash))
    const hashex = hashArray.map(b => b.toString(16).padStart(2, '0')).join("")
    return hashex
}

const checkUserExist = async(username: string):Promise<void> => {
    const credentialFound = await CredentialModel.findOne({ where: {
       username: username
       }})


    if(credentialFound) throw new Error(`El usuario username: ${username} ya existe. Intente con un username diferente`)
}

export const getCredenctialService = async(entityManager: EntityManager,username: string, password: string): Promise<Credential> => {
    
   const credential: Credential = entityManager.create(Credential,{
        username: username,
        password: await crypPass(password)
    })

 return await entityManager.save(credential)
    
    
}
export const checkUserCredentialService = async(username: string, password: string): Promise<number> => {
     const credentialFound =  await CredentialModel.findOne({where:{
        username: username
     }})
     if(credentialFound?.password === await crypPass(password)) return credentialFound.id
     else throw new Error(`Usuario o contraseña erroneos`)

}

