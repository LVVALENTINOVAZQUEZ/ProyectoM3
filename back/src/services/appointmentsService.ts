import { scheduleAppDTO } from "../dtos/AppointmentDTO";
import { IAppointment, Status } from "../interfaces/AppointmenInterface";
import { getUserByIdService } from "./userServices";

const AppointmentList : IAppointment[] = []

let id: number =  1


export const getAppService = async(): Promise<IAppointment[]> => {
    return AppointmentList
}

export const getAppByIdService = async(id: number): Promise<IAppointment> => {
    const appFound = AppointmentList.find(app => app.id === id)
    if(!appFound) throw new Error(`La cita con id: ${id} no fue encontrada`)
        else return appFound
}

export const cancelAppService = async(id:number): Promise<IAppointment> => {
    const appFound = AppointmentList.find(app => app.id === id)
    if(!appFound) throw new Error(`La cita con id: ${id} no fue encontrada`)

        appFound.status = Status.cancelled
        return appFound
}

export const registerAppService = async(appointment: scheduleAppDTO): Promise<scheduleAppDTO> => {
    await getUserByIdService(appointment.userId)

    const appFound = AppointmentList.find(app => new Date(app.date).getTime() === new Date(appointment.date).getTime() && app.time === appointment.time && app.userId === appointment.userId)
    if(appFound) throw Error(`La cita ya existe para el usuario con id: ${appointment.userId}`)

        const newAppointment: IAppointment = {
            id: id++,
            date: new Date(appointment.date),
            time: appointment.time,
            userId: appointment.userId,
            status: Status.active
        }
        AppointmentList.push(newAppointment)
        return newAppointment
}
