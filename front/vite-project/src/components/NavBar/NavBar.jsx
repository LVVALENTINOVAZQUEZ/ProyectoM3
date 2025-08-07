import { Link, useNavigate } from 'react-router-dom';
import Styles from './NavBar.module.css'; 
import Swal from "sweetalert2"
import { useContext } from 'react';
import { UsersContext } from '../../../Context/UsersContext';

export default function NavBar() {

  const {logOutUser} = useContext(UsersContext)
  const navigate = useNavigate()
  console.log(typeof logOutUser)
 const handleLogOut = () => {
  logOutUser()
   navigate("/login")
   Swal.fire({
    icon: "warning",
    title: "Tu sesión fue cerrada correctamente"
   })
 }
  

  return (
    <div className={Styles.navbarContainer}>
      <nav className={Styles.navbar}>
        <div className={Styles.logo}>Clínica San Marino</div>
        <li className={Styles.navItem}>
          <Link
            to="/"
            className={`${Styles.navLink} ${
              location.pathname === '/' ? Styles.active : ''
            }`}
          >
            Home
          </Link>
        </li>

        <li className={Styles.navItem}>
          <Link
            to="/agendarturno"
            className={`${Styles.navLink} ${
              location.pathname === '/agendarturno' ? Styles.active : ''
            }`}
          >
            Agendar Turno
          </Link>
        </li>

        <li className={Styles.navItem}>
          <Link
            to="/misturnos"
            className={`${Styles.navLink} ${
              location.pathname === '/misturnos' ? Styles.active : ''
            }`}
          >
            Mis Turnos
          </Link>
        </li>

        <li className={Styles.navLink} onClick={handleLogOut}>
          LogOut
        </li>
      </nav>
    </div>
  );
}

