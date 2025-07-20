import { Repository } from "typeorm";
import { Appointment } from "../entities/AppointmentEntity";
import { AppDataSource } from "../Config/data-source";
import { Status } from "../interfaces/AppointmenInterface";




export const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({

validateAllowAppointment: function(date: Date, time: string): void{

    const [hours, minutes] = time.split(":").map(Number)
    const appointmentDate = new Date(date)
    appointmentDate.setHours(hours, minutes, 0)
    const today = new Date()

    const appointmentDateInArg = new Date(appointmentDate.getTime() - (3 * 60 * 60 * 1000)) // Convert to Argentina time
    const nowInArg = new Date(new Date().getTime() - (3 * 60 * 60 * 1000)) // Convert to Argentina time
    
    if (appointmentDateInArg < nowInArg) {
        throw new Error("no se pueden agendar citas en fechas pasadas");
    }

    const diffMilliseconds = today.getTime() - appointmentDate.getTime();
    const diffInHours = diffMilliseconds / (1000 * 60 * 60);
    if (diffInHours > 24) {
        throw new Error("no se pueden agendar citas con menos de 24 horas de anticipación");
    }

    const dayOfWeek = appointmentDateInArg.getUTCDay()
    if(dayOfWeek === 5 || dayOfWeek === 6) {
        throw new Error("no se pueden agendar citas los fines de semana");
    }

    if(hours < 8 || hours > 17){
        throw new Error("las citas deben ser entre las 8:00 y las 18:00 horas");
    }

},

validateExistisAppointment: async function(usersId: number, date:Date, time: string): Promise<void> {
   const appointmentFound = await this.findOne({
    where:{
        user: {
            id: usersId
        },
        time: time,
        date: date,
        status: Status.active
    }
   })
   if(appointmentFound) throw new Error(`La cita ya existe para el usuario con id: ${usersId}`)
   }
})
    
    