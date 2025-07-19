import { EntityManager } from "typeorm";
import { AppDataSource, UserModel } from "../Config/data-source";
import { userLoginDTO, userLoginSccDTO, userRegisterDTO, userResponseDTO } from "../dtos/UserDTO";
import { User } from "../entities/UserEntity";
import { checkUserCredentialService, getCredenctialService } from "./credentialService";




export const getUserService = async (): Promise<userResponseDTO[]> => {
return await UserModel.find()
}

export const getUserByIdService = async (id:number): Promise<User | null> => {
    const userFound = await UserModel.findOne({
        where: {id:id},
    //   relations: ['appointment'] //buscamos el usuario y sus credenciales
    }) //buscamos el usuario
    if(!userFound) throw new Error(`El usuario con id: ${id} no fue encontrado`)//sino hacemos una excepción
        else return userFound
}




export const registerUserService = async(user: userRegisterDTO): Promise<userResponseDTO> => {

   const resultadoTransacción = await AppDataSource.transaction(async(entityManager) => {
   const idUserCredentials = await getCredenctialService(entityManager, user.username, user.password)
   const newUser: User = entityManager.create(User,{ 
    name: user.name,
    birthdate: user.birthdate,
    email: user.email,
    nDni: user.nDni,
    credentials: idUserCredentials
   })

    await entityManager.save(newUser)
    return newUser
   
})

return {
    name: resultadoTransacción.name,
    email: resultadoTransacción.email
}
}

export const loginUserService = async(user: userLoginDTO): Promise<userLoginSccDTO> => {

 const credentialId: number = await checkUserCredentialService(user.username, user.password)

 const userFound: User | null = await UserModel.findOne({ where: {
    credentials: {
        id: credentialId
    }
 }})

 return{
    id: userFound?.id ?? 0,
    name: userFound?.name ?? "",
    email: userFound?.email ?? "",
    birthdate: userFound?.birthdate ?? new Date(),
    nDni: userFound?.nDni ?? 0
 }
}