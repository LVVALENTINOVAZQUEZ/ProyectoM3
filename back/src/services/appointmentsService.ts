import { scheduleAppDTO } from "../dtos/AppointmentDTO";
import { Appointment } from "../entities/AppointmentEntity";
import { Status } from "../interfaces/AppointmenInterface";
import { AppointmentRepository } from "../repositories/Appointment.Repository";
import { getUserByIdService } from "./userServices";




export const getAppService = async(): Promise<Appointment[]> => {
    return await AppointmentRepository.find()
}

export const getAppByIdService = async(id: number): Promise<Appointment | null> => {
    const appFound = await AppointmentRepository.findOne({
        where:{
            id: id
        }
    })
    if(!appFound) throw new Error(`La cita con id: ${id} no fue encontrada`)
        else return appFound
}

export const cancelAppService = async(id:number): Promise<Appointment> => {
    const appFound = await AppointmentRepository.findOne({
        where:{
            id: id
        }
    })
    if(!appFound) throw new Error(`La cita con id: ${id} no fue encontrada`)
        appFound.status = Status.cancelled
        await AppointmentRepository.save(appFound)
        return appFound
}

export const registerAppService = async(appointment: scheduleAppDTO): Promise<scheduleAppDTO> => {
    await getUserByIdService(appointment.userId)

    AppointmentRepository.validateAllowAppointment(appointment.date, appointment.time)
    await AppointmentRepository.validateExistisAppointment(appointment.userId, appointment.date, appointment.time)

        const newAppointment: Appointment = AppointmentRepository.create({
        
            date: appointment.date,
            time: appointment.time,
            user: {
                id: appointment.userId
            },
        })
        await AppointmentRepository.save(newAppointment)
        return {
            date: newAppointment.date,
            time: newAppointment.time,
            userId: newAppointment.user.id,
        }
}
