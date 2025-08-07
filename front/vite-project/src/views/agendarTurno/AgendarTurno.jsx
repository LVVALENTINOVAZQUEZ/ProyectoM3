import Swal from "sweetalert2";
import Styles from "./AgendarTurno.module.css";
import { useFormik } from "formik";
import { dateTimeValidates } from "../../helpers/validates";
import { UsersContext } from "../../../Context/UsersContext";
import { useContext } from "react";

const AgendarTurno = () => {

   const {createUserAppointment} = useContext(UsersContext)
  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
    },
    initialErrors: {
      date: "La fecha es obligatoria",
      time: "La hora es obligatoria",
    },
    validate: dateTimeValidates,
    onSubmit: async (values) => {

        
    
      try {
        await createUserAppointment(values)
        Swal.fire({
          icon: "success",
          title: "Turno agendado correctamente",
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: `${err.response.data.message}`,
          text: "Intentelo de nuevo",
        });
      } finally {
        formik.resetForm();
      }
    },
  });

  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Agendar Turno</h1>
      <form className={Styles.form} onSubmit={formik.handleSubmit}>
        <div className={Styles.formGroup}>
          <label htmlFor="date">Fecha</label>
          <input
            id="date"
            name="date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
            className={
              formik.touched.date && formik.errors.date
                ? Styles.errorInput
                : Styles.input
            }
          />
          {formik.errors.date ? (
            <div className={Styles.error}>{formik.errors.date}</div>
          ) : null}
        </div>

        <div className={Styles.formGroup}>
          <label htmlFor="time">Hora</label>
          <input
            id="time"
            name="time"
            type="time"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.time}
            className={
              formik.touched.time && formik.errors.time
                ? Styles.errorInput
                : Styles.input
            }
          />
          {formik.errors.time ? (
            <div className={Styles.error}>{formik.errors.time}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className={Styles.submitButton}
          disabled={Object.keys(formik.errors).length > 0}
        >
          Agendar
        </button>
      </form>
    </div>
  );
};

export default AgendarTurno;

