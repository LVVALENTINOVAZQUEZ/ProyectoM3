import { useFormik } from 'formik'
import { registerFormValidates } from '../../helpers/validates'
import styles from './Register.module.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";


const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      birthdate: '',
      nDni: '',
      username: '',
      password: ''
    },
    validate: registerFormValidates,
    onSubmit: (values) => {
      axios.post(`http://localhost:3000/users/register`, values)
       .then((res) => {
        if(res.status === 201){ 
           Swal.fire({
            icon: "success",
            title: "Usuario registrado con éxito!"
           
          })
        }
       })
      .catch((err) => {
        if (err.response.data.message.includes("email")) {
  Swal.fire({
    icon: "error",
    title: `Ya existe un usuario con el email: ${formik.values.email}`,
    text: "Intente de nuevo con otro email"
  });
} else if (err.response.data.message.includes("username")) {
  Swal.fire({
    icon: "error",
    title: `Ya existe un usuario con el username: ${formik.values.username}`,
    text: "Intente de nuevo con otro username"
  });
} else if (err.response.data.message.includes("nDni")) {
  Swal.fire({
    icon: "error",
    title: `Ya existe un usuario con el DNI: ${formik.values.nDni}`,
    text: "Intente de nuevo con otro DNI"
  });
}
      })
    
    },
  })

  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <h2 className={styles.formTitle}>Formulario De Registro</h2>

      {/* 1. Nombre */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="name">Nombre:</label>
        <input
          id="name"
          className={styles.formInput}
          type="text"
          name="name"
          placeholder="Tu nombre"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name && (
          <label className={styles.errorLabel}>{formik.errors.name}</label>
        )}
      </div>

      {/* 2. Email */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="email">Email:</label>
        <input
          id="email"
          className={styles.formInput}
          type="email"
          name="email"
          placeholder="ejemplo@dominio.com"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && (
          <label className={styles.errorLabel}>{formik.errors.email}</label>
        )}
      </div>

      {/* 3. Fecha de nacimiento */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="birthdate">Fecha de nacimiento:</label>
        <input
          id="birthdate"
          className={styles.formInput}
          type="date"
          name="birthdate"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.birthdate}
        />
        {formik.errors.birthdate && formik.touched.birthdate && (
          <label className={styles.errorLabel}>{formik.errors.birthdate}</label>
        )}
      </div>

      {/* 4. nDni */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="nDni">nDni:</label>
        <input
          id="nDni"
          className={styles.formInput}
          type="text"
          name="nDni"
          placeholder="Número de DNI"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nDni}
        />
        {formik.errors.nDni && formik.touched.nDni && (
          <label className={styles.errorLabel}>{formik.errors.nDni}</label>
        )}
      </div>

      {/* 5. Username */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="username">Username:</label>
        <input
          id="username"
          className={styles.formInput}
          type="text"
          name="username"
          placeholder="Tu nombre de usuario"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.errors.username && formik.touched.username && (
          <label className={styles.errorLabel}>{formik.errors.username}</label>
        )}
      </div>

      {/* 6. Password */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="password">Password:</label>
        <input
          id="password"
          className={styles.formInput}
          type="password"
          name="password"
          placeholder="••••••••"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && (
          <label className={styles.errorLabel}>{formik.errors.password}</label>
        )}
      </div>

      <button
        className={styles.formButton}
        type="submit"
        disabled={
          Object.keys(formik.errors).length > 0 ||
          !formik.values.name ||
          !formik.values.email ||
          !formik.values.birthdate ||
          !formik.values.nDni ||
          !formik.values.username ||
          !formik.values.password
        }
      >
        Submit
      </button>
      <br />
      <label>Ya tienes cuenta? <Link to="/login"> Login !</Link></label>
    </form>
  )
}

export default Register;

  