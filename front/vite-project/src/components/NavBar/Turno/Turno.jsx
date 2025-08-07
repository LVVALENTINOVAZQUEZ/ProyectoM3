import { useContext } from "react"
import Styles from "./Turno.module.css"
import { UsersContext } from "../../../../Context/UsersContext"
import Swal from "sweetalert2";
export default function Turno({id, date, time, status}){
  const {cancelAppointment} = useContext(UsersContext)
  const handleCandel = async () => {

    try {
      await cancelAppointment(id)
      Swal.fire({
        icon: "warning",
        color: "red",
        title: "Turno cancelado"
      });
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cancelar el turno, intentelo de nuevo"
      });
    }
  }

    return (
  <div className={Styles.appointmentCard}>
    <div className={Styles.appointmentHeader}>
      <h3>Turno #{id}</h3>
      <span className={status === 'active' ? Styles.statusActive : Styles.statusInactive}>{status}</span>
    </div>
    <div className={Styles.appointmentDetails}>
      <p><strong>Fecha:</strong> <span>{date}</span></p>
      <p><strong>Hora:</strong> <span>{time}</span></p>
    </div>
    <button 
    className={`${Styles.cancelButton} ${status === "cancelled" ? Styles.disabled : ""
    }`}
    onClick={handleCandel}
    disabled={status === "cancelled"}
    >
    Cancelar Turno

    </button>
  </div>
)

}