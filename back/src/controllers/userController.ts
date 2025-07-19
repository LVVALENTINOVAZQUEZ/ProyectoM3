import { Request, Response } from "express"
import { userLoginDTO, userLoginSccDTO, userRegisterDTO } from "../dtos/UserDTO"
import { getUserByIdService, getUserService, loginUserService, registerUserService } from "../services/userServices"
import { PostgretsError } from "../interfaces/ErrorInterfaces"

 export const getUsersController = async(req: Request, res: Response): Promise<void> => {
  try {
      const users = await getUserService()
      res.status(200).json({
          message: 'Obtener el listado de todos los usuarios.',
          data: users
      })
    
  } catch (error) {
    res.status(500).json({
        message: error instanceof Error ? error.message: 'Error desconocido'
    })
    
  }

}

export const getUserByIdController = async(req: Request<{id: string}>, res: Response): Promise<void> => {

    
   try {
    const userFound = await getUserByIdService(parseInt(req.params.id,10))
       res.status(200).json(userFound)
    } catch (error) {
    res.status(404).json({
        message: error instanceof Error ? error.message: 'Error desconocido'
    })
   }


}

export const registerUserController = async(req: Request<unknown, unknown, userRegisterDTO>, res: Response):Promise<void> => {
   try {
       const userRegisterResponse = await registerUserService(req.body)
       res.status(201).json({
           message: 'Registro de un nuevo usuario.',
           data: userRegisterResponse
       })
    
   } catch (error) {
    const err = error as PostgretsError
    res.status(400).json({
        message: err instanceof Error ? err.detail ? err.detail: err.message: 'Error desconocido'
    })
    
   } 
         }

export const loginUsersController = async(req: Request<unknown, unknown, userLoginDTO>, res: Response):Promise<void> => {
      
    try {
        
        const user:userLoginSccDTO = await loginUserService(req.body)    
        res.status(200).json({
            
        login: true,
        user

        })
             
    } catch (error) {
        
        res.status(400).json({
        message: error instanceof Error ?  error.message: 'Error desconocido'
    })
        
    }
}

      








