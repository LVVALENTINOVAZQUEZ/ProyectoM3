import { ICredential } from "../interfaces/CredentialInterface";
const credentialsList: ICredential[] = []
let id: number = 1

const crypPass = async (text: string): Promise<string> => {


    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hash = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hash))
    const hashex = hashArray.map(b => b.toString(16).padStart(2, '0')).join("")
    return hashex
}

const checkUserExist = (username: string):void => {
    const credentialFound = credentialsList.find( cred => cred.username === username)
    if(credentialFound) throw new Error(`El usuario username: ${username} ya existe. Intente con un username diferente`)
}

export const getCredenctialService = async(username: string, password: string): Promise<number> => {
    checkUserExist(username)
    const credential: ICredential = {
        id: id++,
        username: username,
        password: await crypPass(password)
    }
    credentialsList.push(credential)
    
    return credential.id
}

export const checkUserCredentialService = async(username: string, password: string): Promise<number> => {
     const credentialFound = credentialsList.find( cred => cred.username === username)
     if(credentialFound?.password === await crypPass(password)) return credentialFound.id
     else throw new Error(`Usuario o contraseña erroneos`)

}

// const saludar  = async () => {

//     await getCredenctialService("valentino", "jndslcnskc899")
//     await getCredenctialService("valentino2", "jndslcnskc899")
//     await getCredenctialService("valentino3", "jndslcnskc899")
    
//     console.log(await checkUserCredentialService("valentino", "77878788"))

// }

// saludar()