import axios from "axios";
import {  createContext, useState } from "react";





export const UsersContext = createContext({

    userId: "",
    citas: [],
    loginUser: async () => {},
    logOutUser:  () => {},
    getUserAppointments: async () => {},
    createUserAppointment: async () => {},
    cancelAppointment: async () => {}
})

export const UsersProvider = ({children}) => {

    
    
    const [userId, setUserId] = useState(localStorage.getItem("userId"))
    const [citas, setCitas] = useState([]);

    const loginUser = async(values) =>{
    const response = await axios.post("http://localhost:3000/users/login", values)
    localStorage.setItem("userId", response.data.user.id)
    setUserId(response.data.user.id)
}

    const logOutUser = () => {
      localStorage.removeItem("userId")
      setUserId(undefined)
    }

    const getUserAppointments = async () => {
      const respuesta = await axios.get(`http://localhost:3000/users/${userId}`)
    setCitas(respuesta.data.appointments)
    }

    const createUserAppointment = async(values) => await axios.post(`http://localhost:3000/appointments/schedule`,  {...values, userId})

    const cancelAppointment = async(id) => {
    await axios.put(`http://localhost:3000/appointments/cancel/${id}`)
    
    const nuevoArrayCitas = citas.map(cita => {
        if(cita.id === id){
            cita.status = "cancelled"
            return cita
        } else return cita
    })
    setCitas(nuevoArrayCitas)
}

    const value= {
        userId,
        citas,
        loginUser,
        logOutUser,
        getUserAppointments,
        createUserAppointment,
        cancelAppointment
    }
    return (
        <UsersContext.Provider value={value}>
                  {children}
        </UsersContext.Provider> 

    )
}