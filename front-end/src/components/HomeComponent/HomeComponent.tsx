import { UserResponse } from "../../models/UserResponse";
import FormComponent from "../FormComponent/FormComponent";
import NavbarComponent from "../NavbarComponent/NavbarComponent.lazy";
import FooterComponent from "../FooterComponent/FooterComponent.lazy";
import styles from "./HomeComponent.module.scss";

function Home(){
  const user = sessionStorage.getItem('usuario') as any as UserResponse;
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