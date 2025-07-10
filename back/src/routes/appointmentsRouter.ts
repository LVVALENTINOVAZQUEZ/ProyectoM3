import { Request, Response, Router } from "express";
import { scheduleAppDTO } from "../dtos/AppointmentDTO";
import { cancelAppointmentsController,getappointmentsByIdController, getappointmentsController, scheduleAppointmentController } from "../controllers/appointmentsController";


const appointmentRouter: Router = Router()

appointmentRouter.get("/", (req: Request, res: Response):Promise<void> => getappointmentsController(req, res))
appointmentRouter.get("/:id", (req: Request<{id: string}>, res: Response):Promise<void> => getappointmentsByIdController(req, res))
appointmentRouter.post("/schedule", (req: Request<unknown, unknown, scheduleAppDTO>, res: Response):Promise<void> => scheduleAppointmentController(req, res))
appointmentRouter.put("/cancel/:id", (req: Request<{id:string}>, res: Response):Promise<void> => cancelAppointmentsController(req, res))


export default appointmentRouter











// GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.

// GET /appointments => Obtener el detalle de un turno específico.

// POST /appointments/schedule => Agendar un nuevo turno.

// PUT /appointments/cancel => Cambiar el estatus de un turno a “cancelled”.