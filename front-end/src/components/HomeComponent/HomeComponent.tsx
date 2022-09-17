import FormComponent from "../FormComponent/FormComponent";
import GridComponent from "../GridComponent/GridComponent.lazy";
import NavbarComponent from "../NavbarComponent/NavbarComponent.lazy";
import FooterComponent from "../FooterComponent/FooterComponent.lazy";
import styles from "./HomeComponent.module.scss";

function Home(){
    return(
      <div>
        
      <NavbarComponent></NavbarComponent>
      <h2 className={styles.title}>
        ¡No postergues mas tu futuro! 
      </h2>
      <h3 className={styles.subtitle}>
        Clases nuevas todos los dias
      </h3>
      <FormComponent></FormComponent>
      <FooterComponent></FooterComponent>
      </div>
    )
}

export default Home;