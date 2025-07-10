import { Request, Response } from "express"
import { scheduleAppDTO } from "../dtos/AppointmentDTO"
import { cancelAppService, getAppByIdService, getAppService, registerAppService } from "../services/appointmentsService"

export const getappointmentsController  = async(req: Request, res: Response): Promise<void> => {
 try {
      res.status(200).json({
         message: 'Obtener el listado de todos los turnos de todos los usuarios.',
         data: await getAppService()
      })

 }  catch (error) {
     res.status(500).json({
          message: error instanceof Error ? error.message: 'Error desconocido'
     })
 } 
    
}

export const getappointmentsByIdController =  async(req: Request<{id:string}>, res: Response): Promise<void> => {
 try {
      res.status(200).json({
         message: 'Obtener el detalle de un turno específico.',
         data: await getAppByIdService(parseInt(req.params.id, 10))
      })

 }  catch (error) {
     res.status(500).json({
          message: error instanceof Error ? error.message: 'Error desconocido'
     })
 } 
    
}
export const scheduleAppointmentController =  async(req: Request<unknown, unknown, scheduleAppDTO>, res:Response):Promise<void> => {
 try {
      res.status(200).json({
         message: 'Agendar un nuevo turno.',
         data: await registerAppService(req.body)
      })

 }  catch (error) {
     res.status(500).json({
          message: error instanceof Error ? error.message: 'Error desconocido'
     })
 } 
    
}
export const cancelAppointmentsController =  async(req: Request<{id:string}>, res:Response):Promise<void> => {
 try {
      res.status(200).json({
         message: 'Cambiar el estatus de un turno a “cancelled”.',
         data: await cancelAppService(parseInt(req.params.id, 10))
      })

 }  catch (error) {
     res.status(500).json({
          message: error instanceof Error ? error.message: 'Error desconocido'
     })
 } 
    
}