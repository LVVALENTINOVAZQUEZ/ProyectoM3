import { Link } from "react-router-dom";
import Styles from "../Home/Home.module.css";
import ClinicImage from "../../assets/img/clinica4.jpg"; 

const Home = () => {
  return (
    <div className={Styles.homeContainer}>
      <div className={Styles.imageContainer}>
        <img src={ClinicImage} alt="Clínica moderna" />
      </div>

      <div className={Styles.homeContent}>
        <h1 className={Styles.title}>Bienvenido a Nuestra Clínica</h1>
        <p className={Styles.subtitle}>
          Tu salud es nuestra prioridad. Agenda tu turno con facilidad y confianza.
        </p>
        <Link to="/agendarturno" className={Styles.button}>Agendar turno</Link>
      </div>
    </div>
  );
};

export default Home;



































