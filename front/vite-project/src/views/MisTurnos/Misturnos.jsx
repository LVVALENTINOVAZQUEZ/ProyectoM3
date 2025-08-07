import { useContext, useEffect, useState } from "react"
import Styles from "./MisTurnos.module.css"
import Turno from "../../components/NavBar/Turno/Turno";
import { SpinnerDotted } from 'spinners-react';
import { UsersContext } from "../../../Context/UsersContext";



export default function Misturnos() {

    const {getUserAppointments, citas} = useContext(UsersContext)

   useEffect(() => {
    setTimeout(() => { 
     getUserAppointments()
       
    }, 3000)
    }, [])

    return (
      <div className={Styles.contenedor}>
        <div className={Styles.contenedorH1}>
        <h1>Mis Turnos</h1>
      </div> 


      <div className={Styles.containerTurns}>
      {
        citas.length > 0 ? citas.map(turno => {
          return <Turno
                  key={turno.id}
                  id={turno.id}
                  date={turno.date}
                  time={turno.time}
                  status={turno.status}
                  />
        }) : (
          <SpinnerDotted 
          
          color="#"
          thinckeness={300}
          size={100}
          />
        )
      }
      </div>
      </div>
    );
    }