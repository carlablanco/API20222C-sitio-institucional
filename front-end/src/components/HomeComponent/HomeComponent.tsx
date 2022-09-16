import { UserResponse } from "../../models/UserResponse";
import FormComponent from "../FormComponent/FormComponent";
import NavbarComponent from "../NavbarComponent/NavbarComponent.lazy";
import FooterComponent from "../FooterComponent/FooterComponent.lazy";

function Home(){
  const user = sessionStorage.getItem('usuario') as any as UserResponse;
    return(
      <div>
      <NavbarComponent></NavbarComponent>
      <FormComponent></FormComponent>
      <FooterComponent></FooterComponent>
      </div>
    )
}

export default Home;