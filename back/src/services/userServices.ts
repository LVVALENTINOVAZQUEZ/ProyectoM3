import { userRegisterDTO, userResponseDTO } from "../dtos/UserDTO";
import { IUser } from "../interfaces/userIterface";
import { getCredenctialService } from "./credentialService";

const userList: IUser[] = []
let id: number = 1

export const getUserService = async (): Promise<userResponseDTO[]> => {
    return userList.map(user => {
        return{
            name: user.name,
            email: user.email
        }
    })
}

export const getUserByIdService = async (id:number): Promise<IUser> => {
    const userFound = userList.find(user => user.id === id) //buscamos el usuario
    if(!userFound) throw new Error(`El usuario con id: ${id} no fue encontrado`)//sino hacemos una excepción
        else return userFound
}




export const registerUserService = async(user: userRegisterDTO): Promise<userResponseDTO> => {
   const idUserCredentials = await getCredenctialService(user.username, user.password)

   const newUser: IUser = {
    id: id++,
    name: user.name,
    birthday: user.birthday,
    email: user.email,
    ndni: user.dni,
    credentialsId: idUserCredentials
   }
   userList.push(newUser)
   return {
    name: newUser.name,
    email: newUser.email,
   }
}